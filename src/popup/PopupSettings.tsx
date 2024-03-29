"use strict";

// external imports
import { Fragment } from "preact";
import { useContext } from "preact/hooks";

// internal imports
import { ThemeContext, themeFlow } from "./Themes";
import { SettingsButton } from "../components/Components";
import { combineClasses } from "../utils";
import "./Popup.scss";

// assets
import aboutSP from "../assets/svgs/icon-about-sp.svg";
import feedback from "../assets/svgs/icon-feedback.svg";
import bugs from "../assets/svgs/icon-bugs.svg";
import help from "../assets/svgs/icon-help.svg";
import policy from "../assets/svgs/icon-policy.svg";
import hundredAuto from "../assets/svgs/icon-100-auto.svg";

function chunk(arr: any[], chunkSize: number) {
  if (chunkSize <= 0) throw "Invalid chunk size";
  var R = [];
  for (var i = 0, len = arr.length; i < len; i += chunkSize)
    R.push(arr.slice(i, i + chunkSize));
  return R;
}

const PopupSettings = ({ setTheme }) => {
  const theme = useContext(ThemeContext);

  const settingsFields = [
    {
      iconUrl: themeFlow[theme].iconUrl,
      text: themeFlow[theme].currText,
      onClick: () => {
        setTheme(themeFlow[theme].next);
      },
    },
    {
      iconUrl: aboutSP,
      text: "About Story Points",
      href: "https://github.com/100Automations/github-story-points-calculator#readme",
    },
    {
      iconUrl: hundredAuto,
      text: "About 100 Automations",
      href: "https://100automations.org/",
    },
    {
      iconUrl: feedback,
      text: "Submit Feedback",
      href: "https://forms.gle/r2RzyML7i55xLGC78",
    },
    {
      iconUrl: bugs,
      text: "Report Bugs",
      href: "https://github.com/100Automations/github-story-points-calculator/issues/new",
    },
    {
      iconUrl: help,
      text: "Help",
      href: "https://100automations.github.io/github-story-points-calculator/",
    },
    {
      iconUrl: policy,
      text: "Private Policy",
      href: "https://www.hackforla.org/privacy-policy",
    },
  ];

  interface SettingsRowProps {
    addClass?: string;
    fields: any[];
  }

  const SettingsRow = ({ addClass, fields }: SettingsRowProps) => {
    return (
      <div className={combineClasses("popup-settings-row", "mb-3", addClass)}>
        {fields.map((field, index) => {
          const { iconUrl, text, ...rest } = field;
          return (
            <SettingsButton
              key={index}
              iconUrl={iconUrl}
              text={text}
              {...rest}
            />
          );
        })}
      </div>
    );
  };

  return (
    <Fragment>
      <div className="mt-3">
        <div className="spoints-p-1">SETTINGS</div>
        <div className="mt-3">
          {chunk(settingsFields, 4).map((fieldChunks, index, arr) => {
            if (index + 1 === arr.length) {
              return (
                <SettingsRow addClass="last" key={index} fields={fieldChunks} />
              );
            } else {
              return <SettingsRow key={index} fields={fieldChunks} />;
            }
          })}
        </div>
      </div>
    </Fragment>
  );
};

export { PopupSettings };
