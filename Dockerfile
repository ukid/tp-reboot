FROM node:10

MAINTAINER bear
ENV CODE /code
# 设置工作目录
WORKDIR $CODE

ADD ./install.sh $CODE
RUN $CODE/install.sh

ADD ./reboot-tplink-ap.js $CODE

ENV portal=""
ENV admin=""
ENV password=""

ENTRYPOINT [ "node" , "reboot-tplink-ap.js"]