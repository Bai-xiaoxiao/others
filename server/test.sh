#！/usr/bin/expect

set timeout 30

spawn ssh -p 6233 kuban@40.73.7.174

expect "passphrase"

send "rj9999\r"

expect "login"

send "cd /home/kuban/apps/kuban-kaide-web \r"

interact