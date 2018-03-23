# GIT lathund

## Allmänna regler (AR#)
1. Döp brancherna till valfritt namn med understreck, GitHub desktop verkar inte klara snedstreck så använd _ istället. Förslagsvis bugfix_aaa eller feature_bbb
2. Gör en branch per uppgift. Ska du lägga till en feature, gör det. Ska du göra en bugfix, gör det. Upprepa stegen för varje branch, det blir lite jobbigt men det är värt det i längden. Om det strular med en merge eller liknande så är det bra att ha lite kod att jobba med.

## Här kommer en liten lathund till git.

Backgrund, ladda ner och installera git (som är till CMD/terminal). Ladda dessutom ner GIT desktop client som var smidigt att använda. Klona mahlberger/DAT255-dreamteam lokalt till din dator. 

Alla filer i group docs är okej att ändra direkt i github, dvs ändra inte heller dessa lokalt och pusha

Det generella arbetssättet är:
*kommandon till terminalen är inom parantes en behöver nog inte användas*

1. uppdatera den lokala repon så att de senaste filerna finns (cmd: git fetch eller git pull origin master).
*Tänk på att varje branch innehåller olika filer, det troliga är att bara master är uppdaterad och innehåller något nytt så för att kunna ta tillvara på de ändringarna så måste slå ihop (merge) den branchen man jobbar i med master men då kan det också bli konflikter.

2. Skapa en ny branch (cmd: git checkout -b branch_name)
  Se också till att ni står i den nya branchen innan ni fortsätter. Se AR1.

3. Redigera koden, testkör den, se till att den fungerar.

4. Förbered för commit (enbart i cmd: git add .)

5. Commit med ett rimligt meddelande på vad som är gjort, en description om det är nödvändigt. (cmd: git coomit -m "meddelande")

Efter detta finns det två alternativa sätt att jobba. Det som är gjort hittills är att en branch är skapad och ni har gjort en ändring i koden så branchen innehåller EN bugfix/feature. Nästa steg är att slå ihop den med master, här finns två vägar.

### Merge med master:
6a. Man byter till branchen master (git checkout master) 

7a. branch->merge into current branch... och väljer sedan den branch man jobbat i (git merge branch_name)

8a. Förhoppningsvis går allt bra men man kan få konflikter om ändringar är gjorda i samma fil. I github desktop ser man vilken fil som berörs, det ser ut ungefär såhär:

```
If you have questions, please
<<<<<<< HEAD
open an issue
=======
ask your question in IRC.
>>>>>>> branch-a
```

Det som står mellan HEAD och ====== är från branchen man stod i och därefter det som stod i branchem man slog ihop med. Det kan finnas flera sådana här konflikter i varje fil vilket kan vara förvirrande. Öppna upp projektet valfri kodeditor, redigera filen där och spara sedan. I detta läget är det viktigt att man gör en bedömning av vilken del av koden som ska användas, det kan vara den ena, den andra, båda delar eller vissa delar från olika brancher. Gör en bedömning och framförallt kompilera och kör koden så att den gör det som förväntas.

9a. Ladda upp på github genom att klicka på push to origin (origin betyder typ github).

** Grejen är att nu kan det strula, innan man gör något dumt kan man köra i cmd: git reset --hard ORIG_HEAD vilket ska ställa tillbaka master till precis innan merge men här är jag osäker. Men prova och se, blir det helt kaos så blir det det. Tänk på AR2. **

### Pull request:

6b. Ladda upp branchen på github genom knappen i github desktop.

7b. I github, klicka på (XX) branches och sedan på branchen du precis laddade upp, följ stegen för att göra en pull request.

8b. Du har nu flyttat över ansvaret att mergea på någon annan vilket är okej om man är osäker. Dock ska man helst kunna slå ihop med master själv.


Några ord om merge:
När man mergar branch A med B tar man ändringar från B och lägger på A. För att merga A med B så står man i branch A och klickar på branch->merge into current branch... och väljer därefter B (cmd: git merge B)
