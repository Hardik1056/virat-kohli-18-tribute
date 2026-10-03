#!/usr/bin/env python3
"""
Script to expand shared/quiz-data.js to 120 verified canonical questions:
- 40 Easy (e1 to e40)
- 40 Medium (m1 to m40)
- 40 Hard (h1 to h40)
Zero IPL content, strictly pure international cricket and historic domestic canon.
"""
import json
import re
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parent.parent

# Read current 60 questions from shared/quiz-data.js
# We preserve e1-e20, m1-m20, h1-h20 exactly as vetted, and append e21-e40, m21-m40, h21-h40.

NEW_EASY_QUESTIONS = [
    {
        "id": "e21",
        "question": "In which year was Virat Kohli named the ICC ODI Player of the Year for the first time in his career?",
        "options": ["2010", "2012", "2014", "2016"],
        "answer": 1,
        "fact": "At just 23 years of age, Kohli won his first ICC ODI Cricketer of the Year in 2012 following his match-winning chases in Hobart and Mirpur.",
        "expertHint": "THE COMMENTARY BOX: 'The breakthrough year of 2012! The young maestro took the cricket world by storm in Australia and Bangladesh!'"
    },
    {
        "id": "e22",
        "question": "At which English stadium did Virat Kohli lift his first ICC Champions Trophy as an Indian player in June 2013?",
        "options": ["Lord's", "The Oval", "Edgbaston (Birmingham)", "Trent Bridge"],
        "answer": 2,
        "fact": "India defeated England by 5 runs in a rain-reduced 20-over thriller at Edgbaston, with Kohli top-scoring with 43 runs.",
        "expertHint": "THE DRESSING ROOM: 'Edgbaston in Birmingham! In drizzling conditions, India held their nerve to win the white-ball crown!'"
    },
    {
        "id": "e23",
        "question": "Against which arch-rival did Virat Kohli score 183 in the 2012 Asia Cup in Dhaka, his highest individual score in ODI cricket?",
        "options": ["Sri Lanka", "Pakistan", "Bangladesh", "Australia"],
        "answer": 1,
        "fact": "Chasing a daunting target of 330 against Pakistan, Kohli hammered 183 off 148 balls with 22 fours and one six.",
        "expertHint": "THE COMMENTARY BOX: 'Mirpur 2012 against Pakistan! Umar Gul, Saeed Ajmal, and Wahab Riaz had no answers to his masterclass!'"
    },
    {
        "id": "e24",
        "question": "Which prestigious civilian honor was conferred upon Virat Kohli by the President of India in 2017?",
        "options": ["Bharat Ratna", "Padma Vibhushan", "Padma Bhushan", "Padma Shri"],
        "answer": 3,
        "fact": "Kohli received India's fourth-highest civilian award, the Padma Shri, at Rashtrapati Bhavan in March 2017.",
        "expertHint": "THE DRESSING ROOM: 'India's fourth-highest civilian award, the Padma Shri, recognized his extraordinary sporting legacy!'"
    },
    {
        "id": "e25",
        "question": "What is Virat Kohli's affectionate nickname, given to him during his Delhi state cricket days?",
        "options": ["Jammy", "Cheeku", "Gabbar", "Hitman"],
        "answer": 1,
        "fact": "His Delhi state coach Ajit Sharma gave him the moniker 'Cheeku' after a popular cartoon character due to his haircut and chubby cheeks.",
        "expertHint": "THE DUGOUT: 'A beloved moniker that echoes across every Indian dressing room and slip cordon!'"
    },
    {
        "id": "e26",
        "question": "Which team did India defeat in the final to lift the 2008 ICC Under-19 Cricket World Cup under Kohli's captaincy?",
        "options": ["Australia", "South Africa", "Pakistan", "England"],
        "answer": 1,
        "fact": "In a rain-curtailed final in Kuala Lumpur, India defended 159 by restricting South Africa to 103/8 under the D/L method.",
        "expertHint": "THE DRESSING ROOM: 'The young Proteas in Kuala Lumpur! A rain-shortened thriller where the young boys showed champion resolve!'"
    },
    {
        "id": "e27",
        "question": "At which iconic stadium did Virat Kohli score his record-breaking 50th ODI century during the 2023 World Cup semi-final?",
        "options": ["Arun Jaitley Stadium (Delhi)", "Eden Gardens (Kolkata)", "Wankhede Stadium (Mumbai)", "Narendra Modi Stadium (Ahmedabad)"],
        "answer": 2,
        "fact": "At Wankhede Stadium on Nov 15, 2023, Kohli scored 117 against New Zealand, bowing to Sachin Tendulkar in the stands.",
        "expertHint": "THE COMMENTARY BOX: 'The electric cauldron of Wankhede Stadium in Mumbai! The city where cricket gods are crowned!'"
    },
    {
        "id": "e28",
        "question": "In what year was Virat Kohli appointed India's full-time Test captain following MS Dhoni's sudden Test retirement?",
        "options": ["2013", "2014", "2015", "2016"],
        "answer": 2,
        "fact": "Kohli officially took full-time charge for the Sydney Test in January 2015 after Dhoni retired following the Boxing Day Test at the MCG.",
        "expertHint": "THE DRESSING ROOM: 'The New Year Test in Sydney in January 2015 inaugurated a fearless new era in Indian cricket!' '"
    },
    {
        "id": "e29",
        "question": "How many centuries did Virat Kohli score during the 2023 ICC Men's Cricket World Cup tournament?",
        "options": ["1", "2", "3", "4"],
        "answer": 2,
        "fact": "Kohli scored 3 centuries (103* vs Bangladesh in Pune, 101* vs South Africa at Eden Gardens, and 117 vs New Zealand at Wankhede).",
        "expertHint": "THE DUGOUT: 'Pune, Kolkata on his birthday, and Mumbai in the semi-final — three monumental tournament centuries!'"
    },
    {
        "id": "e30",
        "question": "Against which country did Virat Kohli make his T20 International debut in June 2010?",
        "options": ["Zimbabwe", "South Africa", "Sri Lanka", "West Indies"],
        "answer": 0,
        "fact": "Kohli made his T20I debut in Harare against Zimbabwe, scoring an unbeaten 26 in a successful 6-wicket run chase.",
        "expertHint": "THE DRESSING ROOM: 'Harare Sports Club against Zimbabwe right after the 2010 tri-series tour!' '"
    },
    {
        "id": "e31",
        "question": "Which national team did India defeat 5-1 in 2018 to win their first-ever bilateral ODI series on their home soil under Kohli's captaincy?",
        "options": ["South Africa", "England", "Australia", "New Zealand"],
        "answer": 0,
        "fact": "India made history by winning 5-1 in South Africa, driven by Kohli's record-shattering 558 runs with three centuries.",
        "expertHint": "THE DUGOUT: 'The Proteas on South African soil! India had never won an ODI series there until Virat led them in 2018!'"
    },
    {
        "id": "e32",
        "question": "Which Indian batsman holds the national record for the most double centuries scored in Test match cricket?",
        "options": ["Sachin Tendulkar", "Rahul Dravid", "Virender Sehwag", "Virat Kohli"],
        "answer": 3,
        "fact": "Kohli leads India with 7 Test double centuries, surpassing Tendulkar and Sehwag who scored 6 each.",
        "expertHint": "THE COMMENTARY BOX: 'Seven colossal Test double tons in Indian whites! He stands alone at the apex of Indian endurance!'"
    },
    {
        "id": "e33",
        "question": "In which year did Virat Kohli captain India to the final of the ICC Champions Trophy in England?",
        "options": ["2013", "2015", "2017", "2019"],
        "answer": 2,
        "fact": "Kohli captained India to the 2017 ICC Champions Trophy final against Pakistan at The Oval after defeating Bangladesh in the semi-final.",
        "expertHint": "THE DRESSING ROOM: 'The English summer of 2017! India stormed through the group stage and semi-final to reach The Oval!' '"
    },
    {
        "id": "e34",
        "question": "Against which Pakistani fast bowler did Virat Kohli hit his famous back-foot straight six over long-on at the MCG in 2022?",
        "options": ["Shaheen Shah Afridi", "Haris Rauf", "Naseem Shah", "Shadab Khan"],
        "answer": 1,
        "fact": "With 28 needed off 8 balls, Kohli stood tall on the back foot and punched Haris Rauf dead straight into the Melbourne night sky.",
        "expertHint": "THE COMMENTARY BOX: 'The express pacer Haris Rauf bowling the 19th over! A stroke of pure divine genius straight down the ground!'"
    },
    {
        "id": "e35",
        "question": "What was Virat Kohli's batting position when he scored a crucial 35 runs in the 2011 ICC Cricket World Cup Final in Mumbai?",
        "options": ["Opening Batsman", "Number 3", "Number 4", "Number 6"],
        "answer": 2,
        "fact": "Kohli walked in at Number 4 at 31/2 after Sachin Tendulkar fell, sharing a crucial 83-run stand with Gautam Gambhir.",
        "expertHint": "THE DRESSING ROOM: 'Number four, walking out into a stunned Wankhede Stadium to steady the ship with Gambhir!' '"
    },
    {
        "id": "e36",
        "question": "Which Australian venue is celebrated as Virat Kohli's favorite overseas ground, where he scored five international centuries across formats?",
        "options": ["The Gabba (Brisbane)", "Adelaide Oval", "Sydney Cricket Ground", "WACA (Perth)"],
        "answer": 1,
        "fact": "Adelaide Oval holds special status for Kohli: his maiden Test century (2012), twin Test tons as captain (2014), World Cup ton vs Pakistan (2015), and T20I 90* (2016).",
        "expertHint": "THE COMMENTARY BOX: 'The magnificent Adelaide Oval! He batted under the cathedral trees like a king in his own palace!'"
    },
    {
        "id": "e37",
        "question": "In the 2014 ICC World Twenty20 in Bangladesh, Virat Kohli won Player of the Tournament. How many runs did he accumulate?",
        "options": ["242 runs", "319 runs", "380 runs", "425 runs"],
        "answer": 1,
        "fact": "Kohli amassed 319 runs in 6 matches at an average of 106.33, hitting 4 half-centuries including 77 in the final.",
        "expertHint": "THE DUGOUT: 'Over three hundred runs in just six tournament matches — three hundred and nineteen runs of pure mastery!'"
    },
    {
        "id": "e38",
        "question": "Who captained the Indian team when Virat Kohli scored his maiden Test century in Adelaide in January 2012?",
        "options": ["MS Dhoni", "Virender Sehwag", "Rahul Dravid", "Sourav Ganguly"],
        "answer": 1,
        "fact": "Virender Sehwag stood in as captain for the 4th Test in Adelaide while MS Dhoni was serving a one-match slow-over-rate ban.",
        "expertHint": "THE DRESSING ROOM: 'The dashing opener Virender Sehwag was leading the side while Dhoni sat out with an over-rate suspension!' '"
    },
    {
        "id": "e39",
        "question": "In which format did Virat Kohli announce his international retirement immediately after winning the 2024 ICC World Cup in Barbados?",
        "options": ["Test Cricket", "One Day Internationals", "Twenty20 Internationals", "All Cricket Formats"],
        "answer": 2,
        "fact": "After winning Player of the Match for his 76 in the final against South Africa, Kohli stepped down from T20Is on top of the world.",
        "expertHint": "THE COMMENTARY BOX: 'The shortest format! Holding the trophy in Barbados, he passed the baton in T20 Internationals!' '"
    },
    {
        "id": "e40",
        "question": "Against which international team did Virat Kohli score his very first international century on December 24, 2009 in Kolkata?",
        "options": ["Australia", "Sri Lanka", "Pakistan", "New Zealand"],
        "answer": 1,
        "fact": "Kohli scored 107 off 114 balls against Sri Lanka at Eden Gardens, sharing a 224-run partnership with Gautam Gambhir to chase down 316.",
        "expertHint": "THE DRESSING ROOM: 'The islanders Sri Lanka under lights at Eden Gardens on Christmas Eve 2009!' '"
    }
]

NEW_MEDIUM_QUESTIONS = [
    {
        "id": "m21",
        "question": "In the 2018 bilateral ODI series in South Africa where India won 5-1, what was Kohli's total run aggregate, a world record for a 6-match bilateral series?",
        "options": ["462 runs", "510 runs", "558 runs", "612 runs"],
        "answer": 2,
        "fact": "Kohli scored 558 runs at an astonishing average of 186.00 with three centuries (112, 160*, 129*) across 6 matches.",
        "expertHint": "THE DUGOUT: 'Five hundred and fifty-eight runs across six matches! An average of 186 that completely overwhelmed the Proteas!'"
    },
    {
        "id": "m22",
        "question": "In the 2016 Mohali virtual quarter-final against Australia in the World T20, how many runs did India require from the final 3 overs before Kohli's onslaught?",
        "options": ["29 runs", "39 runs", "49 runs", "59 runs"],
        "answer": 1,
        "fact": "With India needing 39 off 18 balls, Kohli dismantled James Faulkner and Nathan Coulter-Nile, taking 19 off the 18th and 16 off the 19th over.",
        "expertHint": "THE COMMENTARY BOX: 'Thirty-nine runs needed off 18 deliveries! He took Faulkner and Coulter-Nile to the cleaners in back-to-back overs!'"
    },
    {
        "id": "m23",
        "question": "Against which country did Virat Kohli register his highest individual Test score of 254 not out in October 2019?",
        "options": ["Sri Lanka", "South Africa", "England", "New Zealand"],
        "answer": 1,
        "fact": "In the 2nd Test at Pune, Kohli bat for over 8 hours against Philander, Rabada, and Maharaj, scoring 254* off 336 balls.",
        "expertHint": "THE DUGOUT: 'In Pune against the South African attack! Over eight hours at the crease of ruthless accumulation!'"
    },
    {
        "id": "m24",
        "question": "In October 2013 against Australia in Nagpur, in how many balls did Virat Kohli smash his century chasing 351?",
        "options": ["52 balls", "61 balls", "68 balls", "75 balls"],
        "answer": 1,
        "fact": "Kohli reached his hundred off just 61 balls, finishing on 115* off 66 deliveries as India chased down 351 with three balls to spare.",
        "expertHint": "THE DRESSING ROOM: 'Just two weeks after his 52-ball blitz in Jaipur, he struck another hundred in 61 balls in Nagpur!' '"
    },
    {
        "id": "m25",
        "question": "How many consecutive Test series did India win under Virat Kohli's captaincy between 2015 and 2017, equaling the all-time world record?",
        "options": ["7", "8", "9", "11"],
        "answer": 2,
        "fact": "India won 9 consecutive Test series starting from Sri Lanka in August 2015 to Sri Lanka in December 2017, equaling Australia's world record.",
        "expertHint": "THE COMMENTARY BOX: 'Nine straight Test series triumphs from Colombo to Delhi, equaling Ricky Ponting’s mighty Australian side!'"
    },
    {
        "id": "m26",
        "question": "During the 2019 ICC Cricket World Cup in England, how many consecutive half-centuries did Virat Kohli score, setting a tournament captaincy record?",
        "options": ["3", "4", "5", "6"],
        "answer": 2,
        "fact": "Kohli struck 5 consecutive fifties (82 vs Australia, 77 vs Pakistan, 67 vs Afghanistan, 72 vs West Indies, 66 vs England).",
        "expertHint": "THE DUGOUT: 'Five half-centuries in a row across the group stage in England, leading the batting order from the front!'"
    },
    {
        "id": "m27",
        "question": "Who kept wicket for India in the famous 2018 Johannesburg Test win on a treacherous, deteriorating pitch deemed nearly unplayable?",
        "options": ["MS Dhoni", "Dinesh Karthik", "Parthiv Patel", "Wriddhiman Saha"],
        "answer": 2,
        "fact": "Parthiv Patel was India's wicketkeeper as Kohli's brave side secured a thrilling 63-run victory at the Wanderers.",
        "expertHint": "THE DRESSING ROOM: 'Parthiv Patel stood behind the stumps on a pitch bouncing dangerously toward throat height!' '"
    },
    {
        "id": "m28",
        "question": "In the 2014 Border-Gavaskar Trophy in Australia, how many total runs did Virat Kohli amass across 4 Tests, a record for an Indian in a 4-Test series there?",
        "options": ["585 runs", "642 runs", "692 runs", "735 runs"],
        "answer": 2,
        "fact": "Kohli scored 692 runs at an average of 86.50 with 4 centuries (115, 141, 169, 147) against Johnson, Harris, and Hazlewood.",
        "expertHint": "THE COMMENTARY BOX: 'Six hundred and ninety-two runs across four epic Test matches! Four masterly centuries against prime Aussie pace!'"
    },
    {
        "id": "m29",
        "question": "In the 2016 Wankhede Test where Kohli scored 235 against England, who scored a century from No. 9 in an Indian-record 241-run eighth-wicket stand?",
        "options": ["Ravindra Jadeja", "Jayant Yadav", "Ravichandran Ashwin", "Bhuvneshwar Kumar"],
        "answer": 1,
        "fact": "All-rounder Jayant Yadav scored 104, becoming the first Indian batsman to score a Test hundred from the number nine position.",
        "expertHint": "THE DRESSING ROOM: 'The off-spinning all-rounder Jayant Yadav batted with immense maturity to score his maiden Test hundred!' '"
    },
    {
        "id": "m30",
        "question": "Wisden Cricketers' Almanack named Virat Kohli the Leading Cricketer in the World for three consecutive years. Which years were they?",
        "options": ["2014, 2015, 2016", "2015, 2016, 2017", "2016, 2017, 2018", "2017, 2018, 2019"],
        "answer": 2,
        "fact": "Kohli won the honor in 2016, 2017, and 2018, becoming only the second cricketer after Don Bradman to win it three consecutive times.",
        "expertHint": "THE DUGOUT: 'The three golden years: 2016, 2017, and 2018! Complete domination across all three formats worldwide!'"
    },
    {
        "id": "m31",
        "question": "In the 2022 Melbourne epic vs Pakistan, who was Kohli's partner during the match-saving 113-run fourth-wicket partnership from 31/4?",
        "options": ["Suryakumar Yadav", "Hardik Pandya", "Axar Patel", "Dinesh Karthik"],
        "answer": 1,
        "fact": "Hardik Pandya scored 40 off 37 balls, combining with Kohli for 113 runs after India lost 4 wickets inside the powerplay.",
        "expertHint": "THE DRESSING ROOM: 'Hardik Pandya walked out with ice in his veins, soaking up the pressure until the final over!' '"
    },
    {
        "id": "m32",
        "question": "How many catches did Virat Kohli take in Test cricket for India, ranking him second only to Rahul Dravid among Indian non-wicketkeepers?",
        "options": ["98", "111", "125", "138"],
        "answer": 1,
        "fact": "Kohli took 111 catches in 113 Tests, establishing himself as India's premier cordon and slip catcher.",
        "expertHint": "THE COMMENTARY BOX: 'One hundred and eleven Test catches! A brilliant catcher in the slips and cordon with razor-sharp reflexes!'"
    },
    {
        "id": "m33",
        "question": "At which Caribbean stadium did Virat Kohli hit his very first double century in Test cricket (200 in July 2016)?",
        "options": ["Sir Vivian Richards Stadium (Antigua)", "Sabina Park (Jamaica)", "Kensington Oval (Barbados)", "Queen's Park Oval (Trinidad)"],
        "answer": 0,
        "fact": "Kohli scored 200 in North Sound, Antigua, becoming the first Indian captain to score an overseas Test double century.",
        "expertHint": "THE DUGOUT: 'North Sound in Antigua at the Sir Vivian Richards Stadium! Viv himself stood and applauded from the stands!'"
    },
    {
        "id": "m34",
        "question": "In his 200th ODI appearance for India at Wankhede Stadium in October 2017, how did Virat Kohli celebrate the milestone?",
        "options": ["Scored 121 runs", "Took a 3-wicket haul", "Ran out three batsmen", "Scored 50 off 20 balls"],
        "answer": 0,
        "fact": "In scorching humidity in Mumbai, Kohli scored a masterclass 121 against Trent Boult and Tim Southee in his 200th ODI.",
        "expertHint": "THE COMMENTARY BOX: 'He marked his bicentenary match with a resolute century: one hundred and twenty-one against New Zealand!'"
    },
    {
        "id": "m35",
        "question": "In the 2018 Trent Bridge Test win where India bounced back against England, what were Kohli's scores across the two innings?",
        "options": ["82 & 54", "97 & 103", "149 & 51", "103 & 46"],
        "answer": 1,
        "fact": "Kohli fell for 97 in the first innings, then scored 103 in the second innings as India triumphed by 203 runs.",
        "expertHint": "THE DRESSING ROOM: 'Ninety-seven in the first innings followed by a masterly one hundred and three in the second innings!' '"
    },
    {
        "id": "m36",
        "question": "In how many innings did Virat Kohli reach 8,000 ODI runs, the fastest in cricket history at the time?",
        "options": ["175 innings", "182 innings", "190 innings", "200 innings"],
        "answer": 0,
        "fact": "Kohli reached 8,000 runs in his 175th innings during the 2017 Champions Trophy semi-final against Bangladesh in Birmingham.",
        "expertHint": "THE DUGOUT: 'Just one hundred and seventy-five innings! Breaking AB de Villiers’ previous record by seven innings!'"
    },
    {
        "id": "m37",
        "question": "In the 2016 T20 World Cup at Eden Gardens against Pakistan, what was Kohli's match-winning score on a sharply turning pitch?",
        "options": ["46 not out", "55 not out", "67 not out", "78 not out"],
        "answer": 1,
        "fact": "On a spitefully spinning pitch, Kohli handled Mohammad Amir, Mohammad Sami, and Shahid Afridi with supreme composure, scoring 55* off 37 balls.",
        "expertHint": "THE COMMENTARY BOX: 'Fifty-five not out off thirty-seven deliveries! He bowed to Sachin in the club house after sealing victory!'"
    },
    {
        "id": "m38",
        "question": "In October 2016 against New Zealand in Mohali, what was Kohli's unbeaten score while chasing 286 alongside MS Dhoni?",
        "options": ["122 not out", "136 not out", "154 not out", "171 not out"],
        "answer": 2,
        "fact": "Kohli smashed 154* off 134 balls with 16 fours and a six, sharing a 151-run stand with MS Dhoni (80) to guide India home.",
        "expertHint": "THE DRESSING ROOM: 'One hundred and fifty-four not out in Mohali! A masterclass chase orchestrated alongside MS Dhoni!' '"
    },
    {
        "id": "m39",
        "question": "During the 2019 World Test Championship series against South Africa in Ranchi, how many runs did India win by in their record innings triumph?",
        "options": ["Innings & 85 runs", "Innings & 137 runs", "Innings & 202 runs", "Innings & 220 runs"],
        "answer": 2,
        "fact": "India enforced the follow-on and crushed South Africa by an innings and 202 runs to complete a historic 3-0 series whitewash.",
        "expertHint": "THE DUGOUT: 'An innings and over two hundred runs in Ranchi — complete dominance with both bat and red ball!'"
    },
    {
        "id": "m40",
        "question": "How many consecutive calendar years did Virat Kohli average over 50 in Test cricket between 2016 and 2019?",
        "options": ["2 years", "3 years", "4 years", "5 years"],
        "answer": 2,
        "fact": "Kohli averaged 75.93 (2016), 75.64 (2017), 55.08 (2018), and 68.00 (2019) — four straight calendar years averaging above 50 in Tests.",
        "expertHint": "THE COMMENTARY BOX: 'Four glorious calendar years from 2016 through 2019, churning out hundreds in every condition on earth!'"
    }
]

NEW_HARD_QUESTIONS = [
    {
        "id": "h21",
        "question": "In Virat Kohli's Test debut at Sabina Park in June 2011, which West Indian fast bowler dismissed him in both innings?",
        "options": ["Fidel Edwards", "Kemar Roach", "Ravi Rampaul", "Darren Sammy"],
        "answer": 0,
        "fact": "Fidel Edwards dismissed debutant Kohli caught behind for 4 in the first innings and for 15 in the second innings.",
        "expertHint": "THE COMMENTARY BOX: 'The slingy Barbadian express pacer Fidel Edwards got through him in both innings in Jamaica!' '"
    },
    {
        "id": "h22",
        "question": "In December 2006, when 18-year-old Virat Kohli returned to the pitch the morning his father died to score 90 for Delhi, who was his overnight partner?",
        "options": ["Mithun Manhas", "Shikhar Dhawan", "Puneet Bisht", "Rajat Bhatia"],
        "answer": 2,
        "fact": "Wicketkeeper-batsman Puneet Bisht (who scored 156) partnered Kohli as Delhi avoided the follow-on before Kohli attended his father Prem's funeral.",
        "expertHint": "THE DRESSING ROOM: 'Wicketkeeper Puneet Bisht batted with young Virat that emotional morning at Feroz Shah Kotla!' '"
    },
    {
        "id": "h23",
        "question": "When Virat Kohli took his very first wicket in T20 Internationals off his zeroth legal delivery (a wide in 2011), who was the batsman stumped?",
        "options": ["Kevin Pietersen", "Alastair Cook", "Eoin Morgan", "Craig Kieswetter"],
        "answer": 0,
        "fact": "In August 2011 at Old Trafford, Kohli bowled a wide down leg; MS Dhoni smartly whipped off the bails to stump Pietersen before a single legal delivery was bowled!",
        "expertHint": "THE DUGOUT: 'Kevin Pietersen at Old Trafford! A wide down the leg side and Dhoni whipped off the bails in a flash!'"
    },
    {
        "id": "h24",
        "question": "In the 2018 Edgbaston Test where Kohli scored 149 alone, who was India's number 11 who helped him add 51 runs for the final wicket?",
        "options": ["Ishant Sharma", "Umesh Yadav", "Mohammed Shami", "Jasprit Bumrah"],
        "answer": 1,
        "fact": "Umesh Yadav defended resolutely for 16 balls, scoring 1 run while Kohli dominated the bowling to carry India from 223/9 to 274.",
        "expertHint": "THE COMMENTARY BOX: 'Fast bowler Umesh Yadav hung in like a stone at number eleven while Virat dismantled the English attack!'"
    },
    {
        "id": "h25",
        "question": "During India's 2014 tour of England where Kohli struggled with 134 runs in 10 innings, how many times was he dismissed by James Anderson?",
        "options": ["2 times", "4 times", "6 times", "8 times"],
        "answer": 1,
        "fact": "Anderson dismissed Kohli 4 times in 10 innings in 2014. In their 2018 rematch, Anderson bowled 270 deliveries to Kohli without dismissing him even once.",
        "expertHint": "THE DUGOUT: 'Four times in 2014! But four years later in 2018, Anderson bowled over two hundred and seventy balls without getting him once!'"
    },
    {
        "id": "h26",
        "question": "Which umpire gave Virat Kohli out in the 2014 Adelaide Test fourth-innings chase for 141 as he swept off Nathan Lyon?",
        "options": ["Ian Gould", "Marais Erasmus", "Kumar Dharmasena", "Billy Bowden"],
        "answer": 1,
        "fact": "Marais Erasmus was the standing umpire who raised his finger when Mitchell Marsh took the catch at deep midwicket off Nathan Lyon.",
        "expertHint": "THE DRESSING ROOM: 'South African umpire Marais Erasmus was standing at the bowler’s end when the catch was taken in the deep!' '"
    },
    {
        "id": "h27",
        "question": "In the historic 2013 Johannesburg Test where India nearly won at the Wanderers, what were Kohli's scores across the two innings at No. 4?",
        "options": ["119 & 96", "115 & 82", "107 & 77", "134 & 54"],
        "answer": 0,
        "fact": "In his very first Test in South Africa batting at No. 4 after Tendulkar's retirement, Kohli scored 119 and 96 against Steyn, Philander, and Morkel.",
        "expertHint": "THE DUGOUT: 'One hundred and nineteen in the first innings and ninety-six in the second innings against Steyn and Morkel!' '"
    },
    {
        "id": "h28",
        "question": "What were Virat Kohli's exact bowling figures when he dismissed Johnson Charles in the 2016 World T20 semi-final at Wankhede?",
        "options": ["1.4-0-15-1", "1.0-0-12-1", "2.0-0-21-1", "1.4-0-24-1"],
        "answer": 0,
        "fact": "Kohli bowled 1.4 overs, conceding 15 runs and taking 1 wicket (Johnson Charles caught by Rohit Sharma at long-off).",
        "expertHint": "THE DRESSING ROOM: 'One point four overs, fifteen runs conceded, and the key wicket of Johnson Charles with his very first ball!' '"
    },
    {
        "id": "h29",
        "question": "In the 2018 Centurion Test second-innings chase, which South African debutant fast bowler trapped Virat Kohli LBW for 5?",
        "options": ["Lungi Ngidi", "Duanne Olivier", "Dane Paterson", "Beuran Hendricks"],
        "answer": 0,
        "fact": "On his Test debut at his home ground SuperSport Park, Lungi Ngidi took 6/39 in the second innings, including the prized scalp of Kohli LBW.",
        "expertHint": "THE COMMENTARY BOX: 'The young home-town debutant Lungi Ngidi struck the pads with a searing nip-backer!' '"
    },
    {
        "id": "h30",
        "question": "Against which West Indian bowler did Virat Kohli take a single to long-off to reach his 10,000th ODI run in Visakhapatnam in 2018?",
        "options": ["Kemar Roach", "Ashley Nurse", "Marlon Samuels", "Jason Holder"],
        "answer": 1,
        "fact": "Kohli pushed off-spinner Ashley Nurse to long-off for a single to complete 10,000 ODI runs in his 205th innings.",
        "expertHint": "THE DUGOUT: 'Off-spinner Ashley Nurse was bowling when Virat stroked the single down to long-off to make history!' '"
    },
    {
        "id": "h31",
        "question": "In the 2012 Adelaide Test where Kohli scored his maiden Test hundred (116), who was the Australian captain who scored 210 in the same match?",
        "options": ["Ricky Ponting", "Michael Clarke", "Steve Smith", "Shane Watson"],
        "answer": 1,
        "fact": "Michael Clarke scored 210 and shared a 386-run stand with Ricky Ponting (221) while young Kohli was India's sole centurion.",
        "expertHint": "THE COMMENTARY BOX: 'Aussie captain Michael Clarke scored a double century in that Adelaide Test as young Virat fought alone!' '"
    },
    {
        "id": "h32",
        "question": "In the 2021 T20 World Cup in Dubai, who was the Pakistan pacer who dismissed Rohit and Rahul before removing Kohli for 57?",
        "options": ["Shaheen Shah Afridi", "Mohammad Amir", "Wahab Riaz", "Haris Rauf"],
        "answer": 0,
        "fact": "Shaheen Afridi ripped through the top order with searing swinging deliveries before returning to dismiss Kohli caught behind on 57.",
        "expertHint": "THE DRESSING ROOM: 'The tall left-armer Shaheen Shah Afridi struck with the new ball under Dubai floodlights!' '"
    },
    {
        "id": "h33",
        "question": "In the 2017 Champions Trophy group clash at The Oval, who was the Sri Lankan batsman who scored 89 to pull off a 322 chase against India?",
        "options": ["Danushka Gunathilaka", "Kusal Mendis", "Angelo Mathews", "Upul Tharanga"],
        "answer": 1,
        "fact": "Kusal Mendis scored 89 off 93 balls and Danushka Gunathilaka made 76 as Sri Lanka chased down 322 with 8 balls to spare.",
        "expertHint": "THE DUGOUT: 'Kusal Mendis played a breathtaking counter-attacking knock of eighty-nine under English skies!' '"
    },
    {
        "id": "h34",
        "question": "Against which country did Virat Kohli captain India in his 100th Test match appearance in Mohali in March 2022?",
        "options": ["Sri Lanka", "West Indies", "Australia", "England"],
        "answer": 0,
        "fact": "Kohli played his milestone 100th Test match in Mohali against Sri Lanka, scoring 45 runs as India won by an innings and 222 runs.",
        "expertHint": "THE DRESSING ROOM: 'The islanders Sri Lanka in Mohali! Rahul Dravid presented him with his ceremonial 100th Test cap!' '"
    },
    {
        "id": "h35",
        "question": "Against which bowler did 19-year-old Virat Kohli score his very first boundary in international cricket on debut in Dambulla in 2008?",
        "options": ["Chaminda Vaas", "Nuwan Kulasekara", "Muttiah Muralitharan", "Ajantha Mendis"],
        "answer": 0,
        "fact": "Opening the batting, Kohli hit a trademark front-foot cover drive for four off Sri Lanka's legendary left-arm swing bowler Chaminda Vaas.",
        "expertHint": "THE COMMENTARY BOX: 'Sri Lanka’s left-arm maestro Chaminda Vaas! Virat drove him through extra cover with pure poise!' '"
    },
    {
        "id": "h36",
        "question": "In the 2018 Perth Test on a treacherous Optus Stadium track, who dismissed Kohli on 123 with a disputed low slip catch by Peter Handscomb?",
        "options": ["Mitchell Starc", "Pat Cummins", "Josh Hazlewood", "Nathan Lyon"],
        "answer": 1,
        "fact": "Pat Cummins induced the outside edge; second slip fielder Peter Handscomb claimed a low catch that third umpire Nigel Llong upheld.",
        "expertHint": "THE DUGOUT: 'Pat Cummins found the edge in the second session, leading to that hotly debated catch at second slip!' '"
    },
    {
        "id": "h37",
        "question": "In the 2015 World Cup clash in Adelaide vs Pakistan, who dropped Virat Kohli on 3 off Afridi before Kohli went on to score 107?",
        "options": ["Umar Akmal", "Yasir Shah", "Misbah-ul-Haq", "Mohammad Irfan"],
        "answer": 1,
        "fact": "Leg-spinner Yasir Shah dropped a straightforward chance at long-on off Shahid Afridi when Kohli was on just 3.",
        "expertHint": "THE DRESSING ROOM: 'Leg-spinner Yasir Shah grassed the chance at long-on when Virat was on just three runs!' '"
    },
    {
        "id": "h38",
        "question": "In the 2013 high-scoring bilateral ODI series against Australia in India, what was Kohli's total run tally across the 6 completed matches?",
        "options": ["298 runs", "344 runs", "378 runs", "432 runs"],
        "answer": 1,
        "fact": "Kohli scored 344 runs at an average of 114.66 and strike rate of 126.0, including his 52-ball ton in Jaipur and 61-ball ton in Nagpur.",
        "expertHint": "THE COMMENTARY BOX: 'Three hundred and forty-four runs of pure destruction across six games at an average over one hundred and fourteen!' '"
    },
    {
        "id": "h39",
        "question": "At the 2012 ICC World Twenty20 in Colombo, against which team did Kohli score 78 not out chasing 129 in the Super Eights?",
        "options": ["Pakistan", "Australia", "South Africa", "England"],
        "answer": 0,
        "fact": "Kohli dismantled Pakistan's attack of Gul, Ajmal, and Afridi, scoring 78* off 61 balls with 8 fours and 2 sixes at the R. Premadasa Stadium.",
        "expertHint": "THE DRESSING ROOM: 'Super Eights at the Premadasa Stadium against Pakistan! He anchored the chase with seventy-eight not out!' '"
    },
    {
        "id": "h40",
        "question": "Who was India's head coach when Virat Kohli led India to their historic first-ever Test series victory in Australia in 2018–19?",
        "options": ["Anil Kumble", "Ravi Shastri", "Rahul Dravid", "Duncan Fletcher"],
        "answer": 1,
        "fact": "Ravi Shastri served as head coach alongside captain Kohli as India conquered Adelaide and Melbourne to win the series 2-1.",
        "expertHint": "THE COMMENTARY BOX: 'Head coach Ravi Shastri! Together they forged an aggressive, ruthless pace battery that conquered Australia!' '"
    }
]

def main():
    quiz_file = ROOT_DIR / "shared/quiz-data.js"
    content = quiz_file.read_text(encoding="utf-8")

    # Extract existing easy, medium, hard sections
    # Clean any accidental double apostrophes or quotation artifacts in existing and new questions
    # Format into cleanly formatted JS file

    # Read current existing arrays via python
    # We can parse the arrays by finding easy: [...], medium: [...], hard: [...]
    # Or cleaner: read existing items and append the new ones.
    
    # Parse existing easy questions
    e_match = re.search(r'easy:\s*\[(.*?)\]\s*,\s*medium:', content, re.DOTALL)
    m_match = re.search(r'medium:\s*\[(.*?)\]\s*,\s*hard:', content, re.DOTALL)
    h_match = re.search(r'hard:\s*\[(.*?)\]\s*\n\s*\};', content, re.DOTALL)

    assert e_match and m_match and h_match, "Failed to match tier sections in quiz-data.js"

    # We can reconstruct cleanly
    header = """// =============================================================================
// VIRAT KOHLI CRICKET IQ CHALLENGE — CANONICAL QUESTION POOL
// 120 Comprehensive Questions (40 Easy, 40 Medium, 40 Hard)
// Strictly Pure International Records & Historic First-Class Canon (Zero IPL Content)
// =============================================================================

const QUIZ_DATA = {
"""
    
    # Clean the new questions: remove any trailing ' or artifacts
    for q_list in (NEW_EASY_QUESTIONS, NEW_MEDIUM_QUESTIONS, NEW_HARD_QUESTIONS):
        for q in q_list:
            q["expertHint"] = re.sub(r"'\s*'\s*$", "'", q["expertHint"].strip())
            q["expertHint"] = re.sub(r"'\s*'\s*\"", "'\"", q["expertHint"])

    # Format questions as JS objects
    def format_question(q):
        opts_str = json.dumps(q["options"])
        return f"""    {{
      id: "{q['id']}",
      question: {json.dumps(q['question'])},
      options: {opts_str},
      answer: {q['answer']},
      fact: {json.dumps(q['fact'])},
      expertHint: {json.dumps(q['expertHint'])}
    }}"""

    # Format tier array
    def format_tier(existing_text, new_items):
        existing_cleaned = existing_text.rstrip().rstrip(",")
        new_formatted = ",\n".join(format_question(q) for q in new_items)
        return existing_cleaned + ",\n" + new_formatted

    easy_combined = format_tier(e_match.group(1), NEW_EASY_QUESTIONS)
    medium_combined = format_tier(m_match.group(1), NEW_MEDIUM_QUESTIONS)
    hard_combined = format_tier(h_match.group(1), NEW_HARD_QUESTIONS)

    final_content = f"""{header}  easy: [
{easy_combined.strip()}
  ],

  medium: [
{medium_combined.strip()}
  ],

  hard: [
{hard_combined.strip()}
  ]
}};

if (typeof module !== 'undefined' && module.exports) {{
  module.exports = QUIZ_DATA;
}}
"""

    quiz_file.write_text(final_content, encoding="utf-8")
    print("✓ Successfully expanded shared/quiz-data.js to 120 questions!")

if __name__ == "__main__":
    main()
