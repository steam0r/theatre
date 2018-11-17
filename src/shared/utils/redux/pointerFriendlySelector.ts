import {Pointer} from '$shared/DataVerse/pointer'

type PointerFriendlySelector<S, R, Args extends $IntentionalAny[]> = <
  GivenState extends S | Pointer<S>
>(
  state: GivenState,
  ...args: Args
) => GivenState extends Pointer<S>
  ? Pointer<R>
  : GivenState extends S ? R : never

/**
 * Takes a selector and returns a new selector that supports
 * both normal values and pointers
 */
const pointerFriendlySelector = <S, R, Args extends $IntentionalAny[]>(
  fn: (s: S, ...args: Args) => R,
): PointerFriendlySelector<S, R, Args> => {
  return fn as $IntentionalAny
}

export default pointerFriendlySelector
