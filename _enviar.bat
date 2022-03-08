@echo off

git status

echo INFORME A DESCRICAO DO COMMIT
set /P DESC=

if desc == "" exit 1

git add .
git commit -m "%desc%"
git push origin master

exit 0