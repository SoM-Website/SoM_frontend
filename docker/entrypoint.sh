set -e
if [ "$NODE_ENV" = "production" ]; then
  npx prisma migrate deploy || true
else
  npx prisma migrate dev --name init || true
fi
node server.js
