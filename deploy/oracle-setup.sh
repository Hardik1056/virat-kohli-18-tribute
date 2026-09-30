#!/usr/bin/env bash
# ==============================================================================
# 18 | ONE LAST CHAPTER — Turnkey Oracle Cloud Infrastructure (OCI) Deploy Script
# Works on: Oracle Linux 8/9, Ubuntu 20.04/22.04/24.04, Debian
# ==============================================================================

set -e

echo "=================================================================="
echo " 18 | ONE LAST CHAPTER — ORACLE CLOUD HOSTING DEPLOYMENT "
echo "=================================================================="

# Check if running as root
if [ "$EUID" -ne 0 ]; then
  echo "❌ Please run this script with sudo: sudo bash deploy/oracle-setup.sh"
  exit 1
fi

# Detect Package Manager
if command -v apt-get >/dev/null 2>&1; then
    PKG_TYPE="debian"
elif command -v dnf >/dev/null 2>&1; then
    PKG_TYPE="rhel"
elif command -v yum >/dev/null 2>&1; then
    PKG_TYPE="rhel"
else
    echo "❌ Unsupported package manager. Please use Ubuntu or Oracle Linux."
    exit 1
fi

echo "📦 [1/4] Installing Nginx and Certbot for Free HTTPS..."
if [ "$PKG_TYPE" = "debian" ]; then
    apt-get update -y
    apt-get install -y nginx certbot python3-certbot-nginx rsync ufw
elif [ "$PKG_TYPE" = "rhel" ]; then
    dnf install -y epel-release || yum install -y epel-release
    dnf install -y nginx certbot python3-certbot-nginx rsync firewalld || yum install -y nginx certbot python3-certbot-nginx rsync
fi

echo "🛡️ [2/4] Configuring Oracle OS-Level Firewall (Opening ports 80 & 443)..."
# Oracle Cloud VMs have default iptables/firewalld rules that block 80/443 even if OCI Security List is open.
if command -v ufw >/dev/null 2>&1; then
    ufw allow 80/tcp
    ufw allow 443/tcp
    ufw reload || true
fi

if command -v firewall-cmd >/dev/null 2>&1; then
    systemctl enable firewalld || true
    systemctl start firewalld || true
    firewall-cmd --permanent --add-service=http || true
    firewall-cmd --permanent --add-service=https || true
    firewall-cmd --reload || true
fi

# Also ensure iptables allows incoming HTTP/HTTPS (OCI specific safeguard)
iptables -I INPUT 6 -m state --state NEW -p tcp --dport 80 -j ACCEPT 2>/dev/null || true
iptables -I INPUT 6 -m state --state NEW -p tcp --dport 443 -j ACCEPT 2>/dev/null || true
if command -v netfilter-persistent >/dev/null 2>&1; then
    netfilter-persistent save || true
fi

echo "📂 [3/4] Deploying website files to /var/www/virat-kohli..."
APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TARGET_DIR="/var/www/virat-kohli"

mkdir -p "$TARGET_DIR"
rsync -av --exclude='.git' --exclude='scripts' --exclude='scratch' "$APP_DIR/" "$TARGET_DIR/"
chown -R www-data:www-data "$TARGET_DIR" 2>/dev/null || chown -R nginx:nginx "$TARGET_DIR" 2>/dev/null || true

echo "⚙️ [4/4] Configuring Nginx..."
# Update root path in nginx config to /var/www/virat-kohli
sed -e 's|/usr/share/nginx/html|/var/www/virat-kohli|g' "$APP_DIR/nginx.conf" > /etc/nginx/conf.d/virat-kohli.conf

# Remove default site if present on Debian/Ubuntu
rm -f /etc/nginx/sites-enabled/default

nginx -t
systemctl enable nginx
systemctl restart nginx

echo ""
echo "=================================================================="
echo "🎉 DEPLOYMENT SUCCESSFUL!"
echo "=================================================================="
echo "Your site is now running live on port 80!"
echo ""
echo "IMPORTANT NEXT STEPS IN ORACLE CLOUD CONSOLE:"
echo "1. In OCI Console -> Networking -> Virtual Cloud Networks (VCN):"
echo "   Select your Subnet -> Security Lists -> Default Security List"
echo "   Add Ingress Rule:"
echo "     - Source CIDR: 0.0.0.0/0"
echo "     - IP Protocol: TCP"
echo "     - Destination Port Range: 80, 443"
echo ""
echo "2. (Optional) For Free SSL (HTTPS with your domain):"
echo "   Point your domain A-record to this instance's Public IP, then run:"
echo "   sudo certbot --nginx -d yourdomain.com"
echo "=================================================================="
