import styles from './styles.module.scss'

export const Label = ({ id, children, ...props }: any) => {
  return (
    <label id={id} className={styles.label} {...props}>
      {children}
    </label>
  )
}
