"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { sendEmailSchema, type SendEmailInput } from "../schema";
import { useCategories } from "@/features/owner/categories/hooks/useCategories";  
import { useSendEmail } from "../hooks/useEmails";

interface Props {
	open: boolean;
	onClose: () => void;
}

const recipientOptions = [
	{ value: "ALL", label: "সবাইকে" },
	{ value: "CUSTOMERS", label: "শুধু যারা কিনেছে (Customers)" },
	{ value: "NON_CUSTOMERS", label: "যারা এখনো কিনেনি" },
	{ value: "SPECIFIC_CATEGORY", label: "নির্দিষ্ট Category-র ক্রেতা" },
] as const;

export function BroadcastEmailModal({ open, onClose }: Props) {
	const sendMutation = useSendEmail();
	const { data: categories } = useCategories();

	const {
		register,
		handleSubmit,
		control,
		watch,
		reset,
		formState: { errors },
	} = useForm<SendEmailInput>({
		resolver: zodResolver(sendEmailSchema),
		defaultValues: { recipientType: "ALL" },
	});

	const recipientType = watch("recipientType");

	const onSubmit = (data: SendEmailInput) => {
		sendMutation.mutate(data, {
			onSuccess: () => {
				reset();
				onClose();
			},
		});
	};

	return (
		<Modal
			open={open}
			onClose={onClose}
			title="Broadcast Email"
			description="একসাথে একাধিক user-কে email পাঠান"
			size="lg">
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
				<div>
					<label className="mb-1.5 block text-sm font-medium text-text-primary">
						কাদের পাঠাবেন
					</label>
					<Controller
						control={control}
						name="recipientType"
						render={({ field }) => (
							<select
								{...field}
								className="w-full rounded-md border border-border bg-surface px-3 py-2.5 text-sm text-text-primary focus:border-brand-purple focus:outline-none focus:ring-2 focus:ring-accent-glow">
								{recipientOptions.map(opt => (
									<option key={opt.value} value={opt.value}>
										{opt.label}
									</option>
								))}
							</select>
						)}
					/>
				</div>

				{recipientType === "SPECIFIC_CATEGORY" && (
					<div>
						<label className="mb-1.5 block text-sm font-medium text-text-primary">
							Category
						</label>
						<select
							{...register("categoryId")}
							className="w-full rounded-md border border-border bg-surface px-3 py-2.5 text-sm text-text-primary focus:border-brand-purple focus:outline-none focus:ring-2 focus:ring-accent-glow">
							<option value="">বেছে নিন</option>
							{categories?.map((c: any) => (
								<option key={c.id} value={c.id}>
									{c.name}
								</option>
							))}
						</select>
						{errors.categoryId && (
							<p className="mt-1 text-xs text-red-500">
								{errors.categoryId.message}
							</p>
						)}
					</div>
				)}

				<Input
					label="Subject"
					placeholder="Email subject"
					{...register("subject")}
					error={errors.subject?.message}
				/>

				<div>
					<label className="mb-1.5 block text-sm font-medium text-text-primary">
						Message
					</label>
					<textarea
						{...register("body")}
						rows={6}
						placeholder="Email এর content (HTML সাপোর্ট করে)"
						className="w-full rounded-md border border-border bg-surface px-3 py-2.5 text-sm text-text-primary focus:border-brand-purple focus:outline-none focus:ring-2 focus:ring-accent-glow"
					/>
					{errors.body && (
						<p className="mt-1 text-xs text-red-500">{errors.body.message}</p>
					)}
				</div>

				<div className="flex justify-end gap-3 pt-2">
					<Button type="button" variant="ghost" onClick={onClose}>
						বাতিল
					</Button>
					<Button type="submit" loading={sendMutation.isPending}>
						পাঠান
					</Button>
				</div>
			</form>
		</Modal>
	);
}
