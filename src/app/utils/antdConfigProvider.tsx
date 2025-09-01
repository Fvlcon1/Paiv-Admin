import theme from "@styles/theme";
import { ConfigProvider } from "antd";
import { ReactNode } from "react";

const themeTokens = {
    token: {
      colorPrimary: theme.colors.main.primary,
    },
    components: {
      Radio: {

      },
    },
  };

const AntdConfigProvider = ({
    children
} : {
    children? : ReactNode
}) => {
    return (
        <ConfigProvider theme={themeTokens}>
            {children}
        </ConfigProvider>
    )
}

export default AntdConfigProvider