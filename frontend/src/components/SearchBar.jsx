import React from 'react';
import styled from 'styled-components';

const SearchBar = ({ width = "300px", height = "35px" }) => {
  return (
    <StyledWrapper width={width} height={height}>
      <label className="search-label">
        <input type="text" name="text" className="input" required placeholder="Type here..." />
        <kbd className="slash-icon">/</kbd>
      </label>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .search-label {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    position: relative;
    border: 1px solid transparent;
    border-radius: 12px;
    overflow: hidden;
    background: #3d3d3d;
    padding: 0 calc(${(props) => props.height} / 4);
    cursor: text;
    width: ${(props) => props.width};
    height: ${(props) => props.height};
  }

  .search-label:hover {
    border-color: gray;
  }

  .search-label:focus-within {
    background: #464646;
    border-color: gray;
  }

  .search-label input {
    outline: none;
    width: 100%;
    border: none;
    background: none;
    color: rgb(162, 162, 162);
    font-size: calc(${(props) => props.height} / 2.8);
  }

  .search-label svg {
    position: absolute;
    right: calc(${(props) => props.height} / 4);
    width: calc(${(props) => props.height} * 0.7);
    height: calc(${(props) => props.height} * 0.7);
    color: #7e7e7e;
  }

  .search-label input:focus + .slash-icon,
  .search-label input:valid + .slash-icon {
    display: none;
  }

  .slash-icon {
    position: absolute;
    right: calc(${(props) => props.height} / 4);
    border: 1px solid #393838;
    background: linear-gradient(-225deg, #343434, #6d6d6d);
    border-radius: 3px;
    text-align: center;
    box-shadow: inset 0 -2px 0 0 #3f3f3f, inset 0 0 1px 1px rgb(94, 93, 93), 0 1px 2px 1px rgba(28, 28, 29, 0.4);
    cursor: pointer;
    font-size: calc(${(props) => props.height} / 3.5);
    width: calc(${(props) => props.height} / 1.5);
    height: calc(${(props) => props.height} / 1.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .slash-icon:active {
    box-shadow: inset 0 1px 0 0 #3f3f3f, inset 0 0 1px 1px rgb(94, 93, 93), 0 1px 2px 0 rgba(28, 28, 29, 0.4);
    text-shadow: 0 1px 0 #7e7e7e;
    color: transparent;
  }
`;

export default SearchBar;
