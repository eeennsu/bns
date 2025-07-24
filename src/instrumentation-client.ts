// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/
import * as Sentry from '@sentry/nextjs';

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    // 프로젝트 고유 주소
    dsn: process.env.SENTRY_DNS,

    ignoreErrors: [/AxiosError/i],

    // Add optional integrations for additional features
    // 추가 기능들, 현재는 replay integration 추가
    integrations: [Sentry.replayIntegration()],

    // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
    // 전체 성능 트레이스 수집 비율
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.2 : 0.5,

    // Define how likely Replay events are sampled.
    // This sets the sample rate to be 10%. You may want this to be 100% while
    // in development and sample at a lower rate in production\
    // 에러 없는 세션 중 몇% 를 녹화할지
    replaysSessionSampleRate: 0.1,

    // Define how likely Replay events are sampled when an error occurs.
    // 에러 발생시 무조건 녹화할지
    replaysOnErrorSampleRate: 1.0,

    // Setting this option to true will print useful information to the console while you're setting up Sentry.
    // 콘솔 로그
    debug: false,
  });
}

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
