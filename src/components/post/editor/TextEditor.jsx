import { Controller } from "react-hook-form";
import TinyMce from "./TinyMCEEditor";

const TextEditor = ({ name, control, label, rules }) => {
    return (
        <div className="w-full">
            {label && <label className="inline-block mb-1 pl-1">{label}</label>}
            <Controller
                name={name || "content"}
                control={control}
                rules={rules}
                render={({ field, fieldState }) => (
                    <>
                        <TinyMce
                            value={field.value ?? ""}
                            onChange={(value) => field.onChange(value ?? "")}
                        />

                        {fieldState.error && (
                            <p className="text-sm text-red-500 mt-1">
                                {fieldState.error.message}
                            </p>
                        )}
                    </>
                )}
            />
        </div>
    );
};

export default TextEditor;
