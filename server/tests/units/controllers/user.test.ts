import { userController } from "../../../src/controllers/user";
import { User } from "../../../src/models/user";

vi.mock("../../../src/models/user");

describe("UserController", () => {
    const mockJson = vi.fn();
    const mockCtx = {
        get: vi.fn().mockImplementation((key) => {
            if (key === "userId") return 1;
        }),
        json: mockJson,
    } as any;

    afterEach(() => {
        vi.clearAllMocks();
    });

    test("get() should fetch user by ID", async () => {
        const fakeUser = { id: 1, username: "test" };
        (User.findByPk as any).mockResolvedValue(fakeUser);

        await userController.get(mockCtx);

        expect(User.findByPk).toHaveBeenCalledWith(1);
        expect(mockJson).toHaveBeenCalledWith(fakeUser);
    });
});
