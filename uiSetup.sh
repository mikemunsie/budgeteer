#!/bin/bash

echo "
Budgeteer
";

echo "
=============================
Do you have Brew?
=============================
";

if type brew>/dev/null;
then
  echo "Yes!";
else
  ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)";
fi;

echo "
=============================
Do you have NPM?
=============================
";

if type npm>/dev/null;
then
  echo "Yes!";
else
  brew install npm;
fi;

echo "
=============================
Do you have Nodemon?
=============================
";

if type nodemon>/dev/null;
then
  echo "Yes!";
else
  sudo npm install -g nodemon
fi;

echo "
=============================
Do you have GulpJS?
=============================
";

if type gulp>/dev/null;
then
  echo "Yes!";
else
  sudo npm install --global gulp;
  echo "Now you do have Gulp ;)";
fi;

echo "
=============================
Do you have Bower?
=============================
";

if type bower>/dev/null;
then
  echo "Yes!";
else
  sudo npm install -g bower;
  echo "Now you have bower ;)";
fi;

echo "
=============================
Do you have Bundler?
=============================
";

if type bundle>/dev/null;
then
  echo "Yes!";
else
  sudo gem install bundler;
  echo "Now you have bundler ;)";
fi;

echo "
=============================
Installing Dependencies
=============================
";

rm -rf play/public/vendor;
bundle install;
sudo npm install;
bower install;
gulp;

echo "
=============================
CELEBRATE!
=============================

Want to start the server?
bash go.sh

Want to make front end changes?
gulp dev;

Cheers!
";