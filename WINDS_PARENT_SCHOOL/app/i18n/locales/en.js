const login = {
	account_field: {
		label: "Tài khoản",
		validate_empty: "Chưa nhập tên đăng nhập",
	},
	password_field: {
		label: "Mật khẩu",
		validate_empty: "Chưa nhập mật khẩu",
	},
	button: {
		label: "Đăng nhập",
	},
	register: {
		label: "Chưa có tài khoản?",
		button: "Đăng ký",
	},
};

const app = {
	name: "Dental Hub",
	short_desc: "Cổng thông tin nha khoa",
};

const error = {
	common: "Có lỗi xảy ra. Bạn vui lòng thử lại",
	common_title: "Thông báo",
};
const alert = {
	title: "Thông báo",
	action: {
		ok: "OK",
		cancel: "Bỏ qua"
	},

};
const common = {
	validate: {
		not_empty: "Thông tin không được để trống",
		invalid_phone: "Số điện thoại không hợp lệ",
		invalid_email: "Email không hợp lệ",
		not_zero: "Số không hợp lệ",
		not_select_gender:"Chưa chọn giới tính"
	},
};
const order = {
	list: {
		title: "Đơn hàng",
		item_summary: "Đặt {{quantity}} chiếc răng như ảnh và mô tả kèm theo",
	},
	detail: { title: "Chi tiết đơn hàng" },
	action: {
		cancel: "Huỷ đơn",
		deliver_product: "Giao hàng",
		receive_prototype: "Nhận mẫu",
		confirm: "Xác nhận đơn",
		receive_product: "Đã Nhận hàng"
	},
	update_status: {
		success_message: "Cập nhật đơn hàng thành công",
		error_title: "Cập nhật trạng thái không thành công",
		hud: "Đang cập nhật trạng thái...",
	},
};
const batch = {
	list: {
		title: "Vật tư",
	},
	detail: {
		title: "Chi tiết vật tư",
	},
};

const main_tab = {
	patients: "Bệnh nhân",
	schedules: "Lịch khám",
	batches: "Vật tư",
	orders: "Đơn hàng",
	clinics: "Phòng khám",
	account: "Xưởng",
};


const camera = {
	permisson: {
		title: "Camera permission",
		description: "Ứng dụng cần quyền truy cập camera để chụp ảnh",
		action_allow: "Cho phép",
	},
};

const patient = {
	qrscan: {
		desc: "Quét mã chia sẻ của bệnh nhân để thêm bệnh nhân"
	}
}


export default {
	// Bar title
	home: "Trang chủ",
	notification: "Thông báo",
	user: "Người dùng",
	account: "Tài khoản",

	patients_bar_title: "Bệnh nhân",
	schedules_bar_title: "Lịch khám",
	orders_bar_title: "Đơn hàng",
	clinic_bar_title: "Phòng khám",
	factory_bar_title: "Xưởng",

	// Title
	patients_title: "Quản lý bệnh nhân",
	schedules_title: "Lịch khám chữa bệnh",
	orders_title: "Đơn hàng",
	factories_title: "Xưởng",
	factories_search_title: "Tìm xưởng",
	clinic_title: "Phòng khám",
	news_list_title: "Tin tức",
	promotion_list_title: "Bài viết",

	promotion_detail_title: "Bài viết",
	news_detail_title: "Tin tức",

	// Text
	birthday_value_no_set: "Chưa cập nhật",
	phone_value_no_set: "Chưa cập nhật",
	general_value_no_set: "Chưa cập nhật",

	// Home
	home_group_news_title: "Tin tức",
	home_group_promotion_title: "Bài viết",
	hello: "Xin chào ",
	home_action_view_all_title: "Tất cả",
	home_action_detail_title: "Chi tiết",
	home_item_scan: "Scan",
	home_item_factory: "Xưởng",
	home_item_schedule: "Lịch khám",
	hom_item_add_patient: 'Thêm bệnh nhân',

	// Action
	action_title_cancel: "Bỏ qua",
	action_title_ok: "Ok",

	/**
	 * Schedule
	 */
	schedule_result_note_no_value: "Không có chỉ định nào từ bác sĩ!!!",
	schedule_result_note_warning:
		"Bệnh nhân chưa có các chỉ định cần thiết. Bạn có muốn hoàn thành lịch khám của bệnh nhân?",

	/**
	 * FACTORY
	 */
	favorite_factories_empty_message: "Danh sách xưởng yêu thích đang trống.",

	// Other
	update_user: "SỬA THÔNG TIN",
	his_deal: "Lịch sử giao dịch",
	question: "Hỏi đáp",
	help: "Hướng dẫn sử dụng",
	logout: "Đăng xuất",
	confirm_logout: "Bạn có muốn chắc chắn muốn đăng xuất?",
	all: "Tất cả",
	qa: "Hỏi - đáp",
	detail: "CHI TIẾT",
	// login: "Đăng nhập",
	login_phonenumber: "Đăng nhập bằng số điện thoại",
	phone_number: "Số điện thoại...",
	network_err: "Không có internet",

	app,
	login,
	order,
	batch,
	main_tab,
	error,
	common,
	camera,
	patient,
	alert
};