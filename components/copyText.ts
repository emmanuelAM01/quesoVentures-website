/**
 * Put text on the clipboard, by whichever route the browser actually allows.
 *
 * A copy of apps/portal/lib/copy-text.ts in the portal repo. Two repositories,
 * no shared package, and this is the one piece of browser trivia that has
 * already bitten once: the modal it is used in is opened mostly on phones.
 *
 * navigator.clipboard does not exist outside a secure context, and it can
 * reject inside one — after an await the tap that started the call may no
 * longer count as fresh user activation. So it tries the modern API, falls
 * back to the old textarea trick, and reports honestly rather than pretending.
 *
 * Every caller must also leave the text on screen and selectable. Copy is the
 * convenience; being able to read the thing is the guarantee, and a button
 * whose only output is an invisible side effect gives nobody a way to tell it
 * failed.
 */
export async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Fall through to the legacy path.
  }

  try {
    // The iOS path, which is every browser on an iPhone: they are all WebKit,
    // so Firefox on an iPhone behaves like Safari, not like Firefox.
    //
    // WebKit ignores select() on a hidden element, so the usual opacity-0
    // textarea trick silently copies nothing. It needs a real Range over an
    // element that is technically on screen: one pixel, transparent, out of
    // the way. readonly stops the keyboard flashing up as it happens.
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.top = "0";
    area.style.left = "0";
    area.style.width = "1px";
    area.style.height = "1px";
    area.style.padding = "0";
    area.style.border = "none";
    area.style.outline = "none";
    area.style.boxShadow = "none";
    area.style.background = "transparent";
    document.body.appendChild(area);

    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(area);
    selection?.removeAllRanges();
    selection?.addRange(range);
    area.setSelectionRange(0, text.length);

    const ok = document.execCommand("copy");
    selection?.removeAllRanges();
    document.body.removeChild(area);
    return ok;
  } catch {
    return false;
  }
}
