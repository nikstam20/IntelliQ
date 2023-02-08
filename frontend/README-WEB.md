#Γράφω οδηγίες για web-server (μη τρομαξετε ειναι διαφορα)

1. Πάμε στα frontend και κάνουμε npm install react-router-dom
2. Πάμε στο installation του XAMPP C:\xampp\apache\conf\extra\httpd-vhosts.conf το ανοίγουμε
και στο τέλος γράφουμε (copy-paste):
<VirtualHost *:80>
    ServerName inteliQ.com
    ServerAlias www.inteliQ.com
    ServerAdmin webmaster@inteliQ.com
    DocumentRoot "Path"
     <Directory Path>
        Options Indexes FollowSymLinks MultiViews
  AllowOverride all
  Order Deny,Allow
        Allow from all
        Require all granted
    </Directory>
</VirtualHost>
Στο Path o καθένας βάζει το path για τον δικό του φάκελο για το build του frontend1.
3. Πάμε στο C:\Windows\System32\drivers\etc ανοίγουμε το hosts με το vscode και στο τέλος χωρίς σχόλια βάζουμε 127.0.0.1    www.inteliQ.com (το όνομα μπορουμε να το αλλάξουμε προφανώς και δεν χρειαζεται να εχει www ή .com). Κάνουμε save θα μας πεταξει ενα μήνυμα οτι πρέπει να ειμαστε administrator παταμε retry as administrator.
4. Κάνουμε RESTART τον XAMPP (μην το ξεχασετε αλλιώς δεν δουλευει τίποτα) και πηγαινουμε στο www.my-react-app.com.
5. Enjoy! :) (because we didn't)