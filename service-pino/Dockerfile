FROM node:16.14-alpine

# Sets path inside docker container for commands like COPY
WORKDIR /usr/src/app


# Will copy package.json & package-lock.json
COPY ["package.json", "package-lock.json", "./"]
# Uncomment the following line if you have added npm cmd 'postinstall' in package.json
# RUN npm set unsafe-perm true

# npm ci -> Install from package-lock.json
# --only=production -> Skip dev dependencies
RUN npm i

# Will copy all files from directory where DockerFile is present on host machine to
# path set by WORKDIR above inside docker container
COPY . .

RUN npm run build

EXPOSE 80

# Health checks done by ALB
#HEALTHCHECK --interval=30s --timeout=3s --start-period=10s CMD curl -f http://localhost:3023/health || exit 1

CMD ["npm", "run", "start:prod"]