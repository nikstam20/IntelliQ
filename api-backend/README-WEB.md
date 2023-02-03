#Γράφω οδηγίες για web-server (μη τρομαξετε ειναι διαφορα)

1. Πάμε στα frontend και κάνουμε npm install react-router-dom
2. Πάμε στο installation του XAMPP C:\xampp\apache\conf\extra\httpd-vhosts.conf το ανοίγουμε
και στο τέλος γράφουμε (copy-paste):
<VirtualHost *:80>
    ServerName my-react-app.com
    ServerAlias www.my-react-app.com
    ServerAdmin webmaster@my-react-app.com
    DocumentRoot "C:\Users\georg\OneDrive\Desktop\EMP\4oETOS\7oEksamino\SoftEng\SoftEngVespooky\SoftEng22-13\frontend\frontend1\build"
     <Directory C:\Users\georg\OneDrive\Desktop\EMP\4oETOS\7oEksamino\SoftEng\SoftEngVespooky\SoftEng22-13\frontend\frontend1\build>
        Options Indexes FollowSymLinks MultiViews
  AllowOverride all
  Order Deny,Allow
        Allow from all
        Require all granted
    </Directory>
</VirtualHost>
Ο καθένας βάζει το δικό του φάκελο για το build των frontend (αρχικά για το 1 θα δούμε και για τα 2)
3. Πάμε στο C:\Windows\System32\drivers\etc ανοίγουμε το hosts με το vscode και στο τέλος χωρίς σχόλια βάζουμε 127.0.0.1    www.my-react-app.com (το όνομα μπορουμε να το αλλάξουμε προφανώς και δεν χρειαζεται να εχει www ή .com). Κάνουμε save θα μας πεταξει ενα μήνυμα οτι πρέπει να ειμαστε administrator παταμε retry as administrator.
4. Κάνουμε RESTART τον XAMPP (μην το ξεχασετε αλλιώς δεν δουλευει τίποτα) και πηγαινουμε στο www.my-react-app.com.
5. Enjoy! :) (because we didn't)