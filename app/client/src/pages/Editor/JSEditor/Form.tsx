import React, { useState } from "react";
import styled from "styled-components";
import { JSCollection } from "entities/JSCollection";
import CloseEditor from "components/editorComponents/CloseEditor";
import MoreJSCollectionsMenu from "../Explorer/JSActions/MoreJSActionsMenu";
import { TabComponent } from "components/ads/Tabs";
import FormLabel from "components/editorComponents/FormLabel";
import CodeEditor from "components/editorComponents/CodeEditor";
import {
  EditorModes,
  EditorSize,
  EditorTheme,
  TabBehaviour,
} from "components/editorComponents/CodeEditor/EditorConfig";
import FormRow from "components/editorComponents/FormRow";
import JSObjectNameEditor from "./JSObjectNameEditor";
import { updateJSCollection } from "actions/jsPaneActions";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { ExplorerURLParams } from "../Explorer/helpers";
import JSResponseView from "components/editorComponents/JSResponseView";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  height: calc(
    100vh - ${(props) => props.theme.smallHeaderHeight} -
      ${(props) => props.theme.backBanner}
  );
  overflow: hidden;
  width: 100%;
  ${FormLabel} {
    padding: ${(props) => props.theme.spaces[3]}px;
  }
  ${FormRow} {
    ${FormLabel} {
      padding: 0;
      width: 100%;
    }
  }
`;

const NameWrapper = styled.div`
  width: 49%;
  display: flex;
  align-items: center;
  input {
    margin: 0;
    box-sizing: border-box;
  }
`;

const ActionButtons = styled.div`
  justify-self: flex-end;
  display: flex;
  align-items: center;

  button:last-child {
    margin-left: ${(props) => props.theme.spaces[7]}px;
  }
`;

const SecondaryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100% - 50px);
`;
const MainConfiguration = styled.div`
  padding: ${(props) => props.theme.spaces[4]}px
    ${(props) => props.theme.spaces[10]}px 0px
    ${(props) => props.theme.spaces[10]}px;
`;

export const TabbedViewContainer = styled.div`
  flex: 1;
  overflow: auto;
  position: relative;
  height: 100%;
  border-top: 2px solid ${(props) => props.theme.colors.apiPane.dividerBg};
  ${FormRow} {
    min-height: auto;
    padding: ${(props) => props.theme.spaces[0]}px;
    & > * {
      margin-right: 0px;
    }
  }

  &&& {
    ul.react-tabs__tab-list {
      padding: 0px ${(props) => props.theme.spaces[12]}px;
      background-color: ${(props) =>
        props.theme.colors.apiPane.responseBody.bg};
    }
    .react-tabs__tab-panel {
      height: calc(100% - 36px);
      margin-top: 2px;
      background-color: ${(props) => props.theme.colors.apiPane.bg};
    }
  }
`;
interface JSFormProps {
  jsAction: JSCollection;
  settingsConfig: any;
}

type Props = JSFormProps;

function JSEditorForm(props: Props) {
  const theme = EditorTheme.LIGHT;
  const [mainTabIndex, setMainTabIndex] = useState(0);
  const dispatch = useDispatch();
  const currentJSAction = props.jsAction;

  const handleOnChange = (event: string) => {
    if (currentJSAction) {
      dispatch(updateJSCollection(event, currentJSAction.id));
    }
  };
  const { pageId } = useParams<ExplorerURLParams>();

  return (
    <>
      <CloseEditor />
      <Form>
        <MainConfiguration>
          <FormRow className="form-row-header">
            <NameWrapper className="t--nameOfJSObject">
              <JSObjectNameEditor page="JS_PANE" />
            </NameWrapper>
            <ActionButtons className="t--formActionButtons">
              <MoreJSCollectionsMenu
                className="t--more-action-menu"
                id={currentJSAction.id}
                name={currentJSAction.name}
                pageId={pageId}
              />
            </ActionButtons>
          </FormRow>
        </MainConfiguration>
        <SecondaryWrapper>
          <TabbedViewContainer>
            <TabComponent
              onSelect={setMainTabIndex}
              selectedIndex={mainTabIndex}
              tabs={[
                {
                  key: "code",
                  title: "Code",
                  panelComponent: (
                    <CodeEditor
                      className={"js-editor"}
                      dataTreePath={`${currentJSAction.name}.body`}
                      folding
                      height={"400px"}
                      hideEvaluatedValue
                      input={{
                        value: currentJSAction.body,
                        onChange: (event: any) => handleOnChange(event),
                      }}
                      mode={EditorModes.JAVASCRIPT}
                      placeholder="Let's write some code!"
                      showLightningMenu={false}
                      showLineNumbers
                      size={EditorSize.EXTENDED}
                      tabBehaviour={TabBehaviour.INDENT}
                      theme={theme}
                    />
                  ),
                },
              ]}
            />
          </TabbedViewContainer>
          <JSResponseView jsObject={currentJSAction} theme={theme} />
        </SecondaryWrapper>
      </Form>
    </>
  );
}

export default JSEditorForm;
