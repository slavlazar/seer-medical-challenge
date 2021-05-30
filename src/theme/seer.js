import fontCorporateOtf from '../assets/fonts/Corporate-S-Regular.otf';

const fontFamilyCorporate = 'Corporate-S-Regular';

export default {
  colour: {
    primary: '#E40345',
    secondary: '#3A5EAD',
    text: '#353535',
    heading: '#004F59',
    background: '#fafafa',
    border: '#dcdfe1',
    pending: '#D3E829',
    header: '#f6f4ea',
  },
  font: {
    size: {
      xxsmall: '1rem',
      xsmall: '1.15rem',
      small: '1.4rem',
      medium: '1.6rem',
      large: '1.8rem',
      xlarge: '2.4rem',
      xxlarge: '2.8rem',
    },
    variants: {
      body: {
        family: fontFamilyCorporate,
        style: 'normal',
        weight: 400,
        src: `url(${fontCorporateOtf}) format('otf')`,
      },
      heading: {
        family: fontFamilyCorporate,
        style: 'normal',
        weight: 600,
        src: `url(${fontCorporateOtf}) format('otf')`,
      },
    },
    weight: {
      bold: 600,
      normal: 400,
    },
    family: {
      body: fontFamilyCorporate,
      heading: fontFamilyCorporate,
      fallback: '-apple-system,BlinkMacSystemFont,Lato,Helvetica Neue,Arial,sans-serif',
    },
  },
  lineHeight: {
    text: 1.7,
    heading: 1.5,
  },
};
