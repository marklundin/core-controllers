All components conform to a simple input/output constraint. They accept a `value`
property that, together with other properties, determine how the component renders,
and they accept an `onChange` handle that bubbles up any user initiated changes.

By normalizing the components api, it's easy to auto register components against
values.
