import styled from "styled-components";

export const GroupContainer = styled.div`
    position: relative;
    margin: 45px 0;
`;

const colors = {
    subColor: '#808080',
    mainColor: '#000000'
};

const shrinkLabel = `
        top: -14px;
        font-size: 12px;
        color: ${colors.mainColor};
        `;

export const FormInputContainer = styled.input`
    background: white none;
    color: ${colors.subColor};
    font-size: 18px;
    padding: 10px 10px 10px 5px;
    display: block;
    width: 100%;
    border: none;
    border-radius: 0;
    border-bottom: 1px solid ${colors.subColor};

    &:focus {
      outline: none;
    }
    
    // Whenever the user focuses on the form-input, we want to target the form-input-label and include the shrinkLabel
    &:focus ~ .form-input-label {
      ${shrinkLabel};
    }
    // I'm gonna save the form-input.styles.scss just for future reference on how to include mixins via styled-components
`;

export const FormInputLabelContainer = styled.label`
    color: ${colors.subColor};
    font-size: 16px;
    font-weight: normal;
    position: absolute;
    pointer-events: none;
    left: 5px;
    top: 10px;
    transition: 300ms ease all;

    ${props => props.shrink ? `${shrinkLabel}` : ''}
    // Can't believe that this worked on the first try!
`;
