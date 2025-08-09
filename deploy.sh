
echo "VERCEL_GIT_COMMIT_REF: $VERCEL_GIT_COMMIT_REF"
if [[ "$VERCEL_GIT_COMMIT_REF" == "dev" || "$VERCEL_GIT_COMMIT_REF" == "beta" || "$VERCEL_GIT_COMMIT_REF" == "master" ]] ; then
  # 빌드 진행
  echo "✅ - Build can proceed"
  exit 1;
else
  # 빌드 중단
  echo "🛑 - Build cancelled"
  exit 0;
fi
