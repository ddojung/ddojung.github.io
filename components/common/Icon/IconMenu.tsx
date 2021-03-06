import * as React from 'react';

import Icon from './Icon';
import styles from './style.css';
import { observer } from 'mobx-react-lite';
import { MenuStore } from '../../../stores/MenuStore';

enum EN_ICON_MENU_LIST {
  HOME = 'home',
  CODE = 'code',
  LOCAL_DINING = 'local_dining',
  FACE = 'face',
}

const iconEle = (value: number) => {
  return Object.values(EN_ICON_MENU_LIST).map((type, idx) => {
    const active = idx === value ? styles.active : undefined;

    return (
      <a
        key={idx}
        className={active}
        href=""
        onClick={e => {
          e.preventDefault();
          MenuStore.Location = idx;
        }}
      >
        <Icon type={type} />
      </a>
    );
  });
};

const IconMenu: React.FC<{ locateIdx?: number }> = ({ locateIdx }) => {
  return <div className={styles.container}>{iconEle(locateIdx || MenuStore.Location)}</div>;
};

export default observer(IconMenu);
