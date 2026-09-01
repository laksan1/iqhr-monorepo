export const DEMO_LOGIN = {
  username: 'admin',
  password: 'iqhr-demo-local',
} as const;

/** Подпись для кнопки; пароль не из списков утечек Chrome. */
export const DEMO_LOGIN_LABEL = `${DEMO_LOGIN.username} / ${DEMO_LOGIN.password}`;
