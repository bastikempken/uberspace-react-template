# Uberspace React Template

## Setup Local Env
- copy `.env.example` to `.env`
- fill env values

## Prepare Uberspace

- create app folder under `/var/www/virtual/user_name/html` or `/home/user_name/html`
- create symlinks for domain handling `ln -s html/app_folder domain_name`
- add domain: `uberspace web domain add domain_name`
- set domain to apache: `uberspace web backend set domain_name --apache`

