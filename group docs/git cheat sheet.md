# GIT lathund

Här kommer en liten lathund till git.

Backgrund, ladda ner och installera git (som är till CMD/terminal). Ladda dessutom ner GIT desktop client som var smidigt att använda. Klona mahlberger/DAT255-dreamteam lokalt till din dator. 

Alla filer i group docs är okej att ändra direkt i github, dvs ändra inte heller dessa lokalt och pusha

Det generella arbetssättet är:

1. uppdatera den lokala repon (cmd: git fetch eller git pull origin master)

2. Skapa en ny branch (cmd: git checkout -b feature/(bugfix/)namn_på_ändringen
  Se också till att ni står i den nya branchen innan ni fortsätter.

3. Redigera koden, testkör den, se till att den fungerar.

4. Förbered för commit (enbart i cmd: git add .)

5. Commit med ett rimligt meddelande på vad som är gjort, en description om det är nödvändigt. (cmd: git coomit -m "meddelande")

6. Synca med github (git push origin branch_name)

7. Inte kommit längre än såhär, återkommer...
