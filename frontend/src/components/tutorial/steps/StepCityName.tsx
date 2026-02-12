"use client";

import React from 'react';
import styles from './Steps.module.css';

interface StepCityNameProps {
    value: string;
    onChange: (value: string) => void;
}

export default function StepCityName({ value, onChange }: StepCityNameProps) {
    return (
        <div className={styles.formContainer}>
            <h3 className={styles.title}>あなたの都市に名前をつけてください</h3>
            <p className={styles.subtitle}>
                SAIVerseにあるあなたの都市です。ペルソナたちがここに住みます。
            </p>

            <div className={styles.field}>
                <label>City名</label>
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value.replace(/[^a-zA-Z0-9_]/g, ''))}
                    placeholder="例: my_city"
                    autoFocus
                />
                <p className={styles.fieldHint}>
                    英数字とアンダースコアのみ使用できます。スキップした場合は「city_a」になります
                </p>
            </div>
        </div>
    );
}
