# Tinker This VS Code Extension

VS Code extension for running part of your code with Laravel Tinker

![Demo GIF](demo.gif)

## Features

Executes php code easily with Laravel Tinker for debugging or testing from your editor
It allows:
- Select the code from any file that you want to executer in tinker
- Run the current open file, with no need to save the file on the disk

## Extension Settings

* `myExtension.phpPath`: set the path to your php executable. It supports docker as `docker-compose exec -T php-fpm php`

## Known Issues

Some imports and variable may be not available if it's not part of the selected code.

## Release Notes

### v0.1

Initial release that execute php code easily with Laravel Tinker

### v0.2

Solve some issues when combining quoted and single quoted strings in the executed code 


-----------------------------------------------------------------------------------------------------------

Support the package reporting issues or new idas on github :pray:
**Enjoy it!**
