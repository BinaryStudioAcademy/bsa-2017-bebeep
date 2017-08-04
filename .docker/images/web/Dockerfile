FROM ubuntu:trusty

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update -y
RUN apt-get install -y software-properties-common python-software-properties
RUN add-apt-repository -y ppa:ondrej/php
RUN apt-get update -y && apt-get install -y --force-yes \
    libxml2-dev \
    openssl \
    curl \
    apache2 \
    php7.1 \
    libapache2-mod-php7.1 \
    libmcrypt-dev  \
    libicu-dev \
    mysql-client \
    imagemagick \
    imagemagick-common \
    php7.1-mysql \
    php7.1-iconv \
    php7.1-mcrypt \
    php7.1-intl \
    php7.1-opcache \
    php7.1-mbstring \
    php7.1-json \
    php7.1-dev \
    php7.1-curl \
    php7.1-gd \
    php7.1-cli \
    php7.1-mbstring \
    php7.1-xsl \
    php7.1-imagick \
    php-xdebug

RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
RUN php composer-setup.php --install-dir=/usr/bin --filename=composer
RUN php -r "unlink('composer-setup.php');"

RUN apt-get install beanstalkd

COPY 000-default.conf /etc/apache2/sites-available/000-default.conf

CMD ["/usr/sbin/apache2ctl", "-D", "FOREGROUND"]