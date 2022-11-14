import React, { useEffect, useState } from "react";
import { DetectDockerFileState, SetAppState } from "./globalState";

export const useDetectFileState = (
  setAppState: SetAppState,
  detectState: DetectDockerFileState,
  setDetectState: React.Dispatch<React.SetStateAction<DetectDockerFileState>>
) => {
  const [isManual, setIsManual] = useState(false);
  const [languages, setLanguages] = useState([]);
  const [language, setLanguage] = useState("");
  const [frameworks, setFrameworks] = useState([]);
  const [framework, setFramework] = useState("");

  useEffect(() => {
    setIsManual(detectState.language === "" || detectState.framework === "");
  }, [detectState.folderPath]);

  useEffect(() => {
    window.electronAPI.languageList().then((languages) => {
      setLanguages(languages);
      setLanguage(languages[0]);
    });
  }, []);

  useEffect(() => {
    if (language === "") return;
    window.electronAPI.frameworkList(language).then((frameworks) => {
      setFrameworks(frameworks);
      setFramework(frameworks[0]);
    });
  }, [language]);

  useEffect(() => {
    setDetectState({ ...detectState, language, framework });
  }, [framework]);

  const createDockerFile = async () => {
    try {
      await window.electronAPI.generateDockerfile(
        detectState.folderPath,
        language,
        framework
      );
      setAppState("createDockerFile");
    } catch (error) {
      return;
    }
  };
  return {
    createDockerFile,
    isManual,
    setIsManual,
    language,
    setLanguage,
    languages,
    framework,
    setFramework,
    frameworks,
  };
};
