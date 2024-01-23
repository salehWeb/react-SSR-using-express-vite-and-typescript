// eslint-disable-next-line
import { injectIntoGlobalHook } from "/@react-refresh";

injectIntoGlobalHook(window);

const globalHook = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
const oldCommit = globalHook.onCommitFiberRoot;
globalHook.onCommitFiberRoot = function (
  id,
  root,
  maybePriorityLevel,
  didError
) {
  try {
    if (!root.containerInfo.dataset.hacked) {
      root.current.alternate.memoizedState.element = null;
      root.containerInfo.dataset.hacked = true;
    }
  } catch (ignored) {}

  oldCommit(id, root, maybePriorityLevel, didError);
};

window.$RefreshReg$ = () => {};
window.$RefreshSig$ = () => (type) => type;
