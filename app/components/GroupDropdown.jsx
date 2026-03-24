'use client';

import { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ListIcon } from './Icons';
import styles from './GroupDropdown.module.css';

export default function GroupDropdown({
  groups,
  currentTab,
  onTabChange,
  isOpen,
  onToggle,
}) {
  const dropdownRef = useRef(null);

  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onToggle(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onToggle]);

  const handleItemClick = (groupId) => {
    onTabChange(groupId);
    onToggle(false);
  };

  if (groups.length === 0) return null;

  return (
    <div style={{ position: 'relative' }} ref={dropdownRef}>
      <button
        className="icon-button view-groups-btn"
        onClick={() => onToggle(!isOpen)}
        title="查看分组"
      >
        <ListIcon width="16" height="16" />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className={styles.groupDropdownMenu}
          >
            <div className={styles.groupDropdownHeader}>
              全部分组
            </div>
            <button
              onClick={() => handleItemClick('all')}
              className={`${styles.groupDropdownItem} ${currentTab === 'all' ? styles.active : ''}`}
            >
              <span className={styles.groupDropdownItemName}>
                全部
              </span>
              <span className={styles.groupDropdownItemCount}>
                {groups.reduce((sum, g) => sum + g.codes.length, 0)}
              </span>
            </button>
            <div className={styles.groupDropdownDivider} />
            {groups.map((g) => (
              <button
                key={g.id}
                onClick={() => handleItemClick(g.id)}
                className={`${styles.groupDropdownItem} ${currentTab === g.id ? styles.active : ''}`}
              >
                <span className={styles.groupDropdownItemName}>
                  {g.name}
                </span>
                <span className={styles.groupDropdownItemCount}>
                  {g.codes.length}
                </span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
