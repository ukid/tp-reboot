# Tp-Link AP Rebooter

Tp-Link Ap Rebooter is used for rebooting tp-link ap from remote. Compatible with model TL-AP1907GC-PoE/DC v1.0, version 1.0.5 Build 20200807 Rel.43029.

Tp-Link Ap will be rebooted each time you run the docker command.



## Usage:

````bash
docker build -t tp-reboot .
docker run --rm -e portal=http://192.168.1.2/ -e admin=root -e password=123456 tp-reboot
````



