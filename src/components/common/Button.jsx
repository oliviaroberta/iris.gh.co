import { Link } from 'react-router-dom';

export default function Button({ children, className = '', variant = 'primary', to, ...props }) {
  const classes = `button button--${variant} ${className}`.trim();
  return to ? <Link className={classes} to={to}>{children}</Link> : <button className={classes} type="button" {...props}>{children}</button>;
}
