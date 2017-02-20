#!/bin/bash

usage() { echo "Usage: apply_sql.sh [-u=<username>] [-p=<password>] [-db=<database>]" 1>&2; exit 1; }

for i in "$@"
do
case $i in
    -p=*|--password=*)
        DB_PASSWORD="${i#*=}"
    ;;
    -u=*|--user=*)
        DB_USER="${i#*=}"
    ;;
    -db=*|--dbname=*)
        DB_NAME="${i#*=}"
    ;;
    -p*|--password)
        DB_PASSWORD="$2"
        shift 2
    ;;
    -u*|--user)
        DB_USER="$2"
        shift 2
    ;;
    -db*|--dbname)
        DB_NAME="$2"
        shift 2
    ;;
    -h|--help)
        usage
    ;;
    *)
            # unknown option
    ;;
esac
done

if [ ! $DB_NAME ] || [ ! $DB_PASSWORD ] || [ ! $DB_USER ] ; then
    usage
fi

status_file=$DB_NAME'.txt'

if [ ! -e "$status_file" ] ; then
    touch "$status_file"
fi

for F in *.sql;
do 
flag=0
    while read -r line
    do
        if [ "$F" == $line ]; then
            flag=1
        fi
        done < "$status_file"
    if [ "$flag" != "1" ]; then
        echo 'Importing ' $F'...'
        mysql -u $DB_USER -p$DB_PASSWORD $DB_NAME < $F
        if [ "$?" -ne 0 ]; then  exit 1; fi
        echo 'Importing '$F' done.'
        echo $F >> $status_file
    else
        echo File $F has been already applied, to apply it once again it should be removed from $DB_NAME.txt
    fi
done

