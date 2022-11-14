import React from "react";
import { RiFolderOpenLine, RiSearch2Line } from "react-icons/ri";
import { useGlobalState } from "../../context/globalState";

export const DetectDockerFile = () => {
  const { detectFile, detectState } = useGlobalState();
  return (
    <div>
      <div className="mt-6 flex justify-center ">
        <div className="relative">
          <RiFolderOpenLine className="text-[120px] text-gray-500" />
          <RiSearch2Line className="absolute bottom-0 left-0 -scale-x-100 text-[80px] text-gray-800 opacity-80" />
        </div>
      </div>
      <div className="text-center text-sm text-gray-500">
        {detectState.folderPath}
      </div>
      {detectFile.isManual ? <ManualDetect /> : <AutoDetect />}
    </div>
  );
};

function AutoDetect() {
  const { detectFile, detectState } = useGlobalState();
  return (
    <>
      <div className="text-center leading-4">Automatically detect</div>
      <div className="mt-4 text-center text-sm text-gray-500">Framework</div>
      <div className="text-center leading-3">{detectState.framework}</div>
      <div className="mt-6 flex justify-center">
        <button
          onClick={() => detectFile.createDockerFile()}
          className="h-12 w-64 rounded-3xl bg-[#41F17D] text-gray-50 transition-colors hover:bg-[#31c763] "
        >
          Start build Dockerfile
        </button>
      </div>
      <div className="mt-4 text-center  text-sm">or</div>
      <div className="mt-4 flex justify-center">
        <button
          onClick={() => detectFile.setIsManual(true)}
          className="h-12 w-64 rounded-3xl bg-[#F1CA41] text-gray-50 transition-colors hover:bg-[#31c763] "
        >
          Manually Identify
        </button>
      </div>
    </>
  );
}

function ManualDetect() {
  const { detectFile } = useGlobalState();
  return (
    <div className="flex flex-col items-center">
      <div className="text-center leading-4">Manually detect</div>
      <label
        htmlFor="languages"
        className="mt-3 mb-2 block text-sm font-medium text-gray-900 dark:text-gray-400 "
      >
        Select a language
      </label>
      <select
        id="languages"
        value={detectFile.language}
        onChange={(event) => detectFile.setLanguage(event.currentTarget.value)}
        className="block w-64 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500  focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
      >
        {detectFile.languages.map((language) => (
          <option key={language} value={language}>
            {language}
          </option>
        ))}
      </select>

      <label
        htmlFor="frameworks"
        className="mt-3 mb-2 block text-sm font-medium text-gray-900 dark:text-gray-400 "
      >
        Select a framework
      </label>
      <select
        id="frameworks"
        value={detectFile.framework}
        onChange={(event) => detectFile.setFramework(event.currentTarget.value)}
        className="block w-64 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500  focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
      >
        {detectFile.frameworks.map((framework) => (
          <option key={framework} value={framework}>
            {framework}
          </option>
        ))}
      </select>
      <div className="mt-6 flex justify-center">
        <button
          onClick={() => detectFile.createDockerFile()}
          className="h-12 w-64 rounded-3xl bg-[#41F17D] text-gray-50 transition-colors hover:bg-[#31c763] "
        >
          Start build Dockerfile
        </button>
      </div>
    </div>
  );
}
