FROM nginx:alpine

# Copy custom Nginx configuration with clean URLs and security headers
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy all site assets and HTML files
COPY . /usr/share/nginx/html

# Clean up unwanted Git / local dev files from image
RUN rm -rf /usr/share/nginx/html/.git \
    /usr/share/nginx/html/scripts \
    /usr/share/nginx/html/scratch

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
