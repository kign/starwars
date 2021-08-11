#! /bin/bash -u

if [ -z ${1+x} ]; then
  echo "Usage: $0 <ZIP>"
  exit
fi

cwd="$(pwd)"
zip=$(realpath "$1")

dir="/tmp/javarun_$$"
mkdir $dir
cd $dir || exit 1
unzip "$zip" > /dev/null
exe=$(find $dir/*/bin -type f -perm +111 | egrep -v '\.bat$' | head -1)
cd "$cwd" || exit 1
$exe
rm -rf $dir



