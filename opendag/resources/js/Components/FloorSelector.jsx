import { FLOORS } from '../data/building'
import styles from '../../scss/components/FloorSelector.module.scss'
import { usePage } from '@inertiajs/react';

// Vertical column of buttons for switching between floors.
// Floors are rendered top-to-bottom from highest to lowest (reversed).
export default function FloorSelector({ floor, onChange }) {
  const floors = usePage().props.floors;
  console.log(floor);
  return (
    <div className={styles.panel}>
       {[...floors].reverse().map(f => ( // {/*{[...FLOORS].reverse().map(f => ( GAGA*/}
        <button
          key={f.id}
          className={`${styles.btn} ${floor === f.id ? styles.active : ''}`}
          onClick={() => onChange(f.id)}
          title={f.label} // f.name => f.label GAGA
        >
          {f.abbreviation} {/*f.label GAGA*/}
        </button>
      ))}
    </div>
  )
}
