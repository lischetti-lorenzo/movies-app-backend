#!/bin/bash
set -e
set -o pipefail

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

if [ "$NODE_ENV" = "debug" ]; then
  echo "${GREEN}Running migrations for local.${NC}"
  npx prisma migrate dev
elif [ "$ECS_ENV" = "true" ]; then
  echo "${GREEN}Running migrations for cloud.${NC}"
  npx prisma migrate deploy
else
  echo "${GREEN}Skipping migrations${NC}"
fi;

exec "$@"