import styles from './preloader.module.css';

export const Preloader = () => {
  return(
    <div className={styles.container}>
      <div className={styles.preloader}></div>
    </div>
  )
}