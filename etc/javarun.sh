#! /bin/bash -u

if [ -z ${1+x} ]; then
  echo "Usage: $0 <ZIP>"
  exit
fi

zip="$1"

dir="/tmp/javarun_$$"
mkdir $dir
cd $dir
unzip "$zip" > /dev/null
exe=$(find */bin -type f -perm +111 | egrep -v '\.bat$' | head -1)
$exe
cd
rm -rf $dir



