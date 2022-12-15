import { useState, useCallback } from "react";
import styles from "../../styles/Home.module.css";
import { SpeechToText } from "./speech-to-text";
import { SelectBox } from "./select-box";
import {
  defaultLanguageOptionValue,
  languageOptions,
} from "../data/language-options";

export const SpeechToTextForm = () => {
  const [selectSource, setSelectSource] = useState(defaultLanguageOptionValue);
  const getLanguageLabel = useCallback((languageCode: string): string => {
    const foundOption = languageOptions.find(
      (option) => option.value === languageCode
    );
    return foundOption ? foundOption.label : "";
  }, []);

  return (
    <>
      <div className={styles.grid}>
        <div className={styles.card}>
          <h2>Source Language</h2>
          <SelectBox
            options={languageOptions}
            defaultValue={defaultLanguageOptionValue}
            setSelectOption={setSelectSource}
          />
        </div>
      </div>
      <div className={styles.grid}>
        <div className={styles.card}>
          <h2>{getLanguageLabel(selectSource)}</h2>
          <SpeechToText sourceLanguageCode={selectSource} />
        </div>
      </div>
    </>
  );
};
