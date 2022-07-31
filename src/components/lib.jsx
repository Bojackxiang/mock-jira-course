import styled from "@emotion/styled";

/**
 * emotion 的方法功能
 * 传入 三个 value，
 * 里面的直接子元素按照 * 后面的代码执行
 */
export const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${(props) => props.marginBottom + "rem"};
  margin-top: ${(props) => props.marginTop + "rem"};
  justify-content: ${(props) => (props.between ? "space-between" : undefined)};
  > * {
    margin-right: 2rem;
  }
`;
