include config.mk

APPDIR = /usr/share/nginx/html/smidgeo.com

HOMEDIR = $(shell pwd)

pushall: sync
	git push origin master

sync:
	rsync -a $(HOMEDIR)/ $(USER)@$(SERVER):$(APPDIR) \
		--omit-dir-times --no-perms

prettier:
	prettier --single-quote --write "**/*.js"
