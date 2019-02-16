FROM node:10-stretch

ARG VSCODE
RUN set -x && \
    if [ "$VSCODE" = "1" ]; then \
        # curl https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > /tmp/microsoft.gpg \
        # && mv /tmp/microsoft.gpg /etc/apt/trusted.gpg.d/microsoft.gpg \
        # && sh -c 'echo "deb [arch=amd64] http://packages.microsoft.com/repos/vscode stable main" > /etc/apt/sources.list.d/vscode.list' \
        # && apt-get update \
        apt-get update \
        && apt-get install -y \
            # code \
            dbus-x11 \
            fonts-noto \
            libnotify4 \
            libnss3 \
            libgtk2.0-0 \
            libxss1 \
            libgconf-2-4 \
            libasound2 \
            libxtst6 \
            libcanberra-gtk-dev \
            libgl1-mesa-glx \
            libgl1-mesa-dri \
            # ADDED
            libxkbfile1 \
            libsecret-1-0 \
        && rm -rf /var/lib/apt/lists/* \
        # ; \
        && curl -L https://update.code.visualstudio.com/1.30.2/linux-deb-x64/stable --output /tmp/code.deb \
        && apt install -y /tmp/code.deb; \
    fi

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        bash-completion \
        less \
        vim \
    && rm -rf /var/lib/apt/lists/*

RUN npm install -g yarn

RUN yarn global add npm-completion

RUN mkdir -p /rocket/extension/node_modules && chown -R node:node /rocket

# Setup npm/yarn completion and add node modules to the path
RUN echo "" >> /etc/bash.bashrc; \
    echo "export PATH_TO_NPM_COMPLETION='/usr/local/share/.config/yarn/global/node_modules/npm-completion'" >> /etc/bash.bashrc; \
    echo "if [ -f \$PATH_TO_NPM_COMPLETION/npm-completion.sh ]; then" >> /etc/bash.bashrc; \
    echo "    source \$PATH_TO_NPM_COMPLETION/npm-completion.sh" >> /etc/bash.bashrc; \
    echo "fi" >> /etc/bash.bashrc; \
    echo "" >> /etc/bash.bashrc; \
    echo "export PATH=/rocket/extension/node_modules/.bin:\${PATH}" >> /etc/profile

USER node

WORKDIR /rocket/extension
ADD --chown=node:node package.json /rocket/extension
ADD --chown=node:node yarn.lock /rocket/extension

# If the yarn.lock is empty then either this is the first install
# or the user has identified that they want to force it to be re-generated
RUN if [ ! -s yarn.lock ]; then rm -f yarn.lock; fi && yarn install

ARG VSCODE_VIM
RUN set -x && \
    if [ "$VSCODE" = "1" ]; then \
        code \
            --install-extension eg2.tslint \
            --install-extension hoovercj.vscode-settings-cycler \
            --install-extension miclo.sort-typescript-imports \
            --install-extension eamodio.gitlens \
            --install-extension Angular.ng-template \
        && sed -i "s/^\(.*newline.*generated.*\)..newline.\(.*\)/\1\\\\n\2/" \
            /home/node/.vscode/extensions/miclo.sort-typescript-imports*/out/src/writeImports.js \
        && if [ "$VSCODE_VIM" = "1" ]; then \
            code --install-extension vscodevim.vim; \
        fi \
        ; \
    fi


