import { withAuthenticationRequired } from "@auth0/auth0-react";
import { SpinnerLoading } from "../layouts/Utils/SpinnerLoading/SpinnerLoading";
import { LoadingPage } from "../layouts/LoadingPage/LoadingPage";

export const AuthenticationGuard: React.FC<{ component: any, props?: any }> = (props) => {
  const Component = withAuthenticationRequired(props.component, {
    onRedirecting: () => (
      <LoadingPage />
    )
  });

  return <Component {...props.props} />;
};