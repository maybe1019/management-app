import React from 'react';
import { Block, ExpansionToggle, Header } from './components';
import { CodeBlockTypes } from './CodeBlock.types';
import { CodeBlockContainer, HorizontalRule } from './CodeBlock.styled';
import { returnDataOnly, containsTrue } from './CodeBlock.utils';

export const CodeBlock: React.FC<CodeBlockTypes> = ({
  data,
  invertTheme = false,
}) => {
  const [isExpanded, setExpanded] = React.useState<Record<string, boolean>>({
    toggle: false,
    persistButton: false,
  });

  const isLengthyData = React.useMemo(() => {
    if (containsTrue(isExpanded) || isExpanded.persistButton) return true;
    return Array.isArray(data)
      ? Object.keys(returnDataOnly(data)).length > 4
      : Object.keys(data)?.length > 9;
  }, [data, isExpanded]);

  const handleToggle = () => {
    setExpanded((prev: Record<string, boolean>) => {
      if (containsTrue(prev)) {
        prev = { toggle: false, persistButton: true };
      } else {
        const newVal = { ...prev };
        newVal.toggle = !prev.toggle;
        return newVal;
      }
      return prev;
    });
  };

  if (Array.isArray(data)) {
    return (
      <CodeBlockContainer expanded={containsTrue(isExpanded)}>
        {data.map((group, i) => (
          <React.Fragment key={`${group.name}-${i}`}>
            <Header provider={group.provider} name={group.name} />
            <Block
              data={group.data}
              invertTheme={invertTheme}
              setExpanded={setExpanded}
            />
            {isLengthyData && (
              <ExpansionToggle
                expanded={containsTrue(isExpanded)}
                handleExpansion={() => handleToggle()}
              />
            )}
            {i !== data?.length - 1 ? <HorizontalRule /> : null}
          </React.Fragment>
        ))}
      </CodeBlockContainer>
    );
  }

  return (
    <CodeBlockContainer expanded={containsTrue(isExpanded)}>
      <Block data={data} invertTheme={invertTheme} setExpanded={setExpanded} />
      {isLengthyData && (
        <ExpansionToggle
          expanded={containsTrue(isExpanded)}
          handleExpansion={() => handleToggle()}
        />
      )}
    </CodeBlockContainer>
  );
};
