import style from './style.module.css';
import classNames from 'classnames';

export const BadgeState = {
  active: 'active',
  success: 'success',
};

export default function Badge({ state, children }) {
  var btnClass = classNames([`${style.badge}`], {
    [`${style.success}`]: state === BadgeState.success,
    [`${style.active}`]: state === BadgeState.active,
  });
  return <div className={btnClass}>{children}</div>;
}
