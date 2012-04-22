describe("jDirt", function() {
  var targetForm,
      targetInput,
      resetTrigger,
      dirtyTrigger;

  beforeEach(function() {
     targetForm   = $("<form><input name='tested-input' value='initial value'></input></form>");
     targetInput  = targetForm.find("input");
     targetForm.jDirt();

     resetTrigger = false;
     dirtyTrigger = false;

     targetForm.on("jdirt:reset", function() { resetTrigger = true; });
     targetForm.on("jdirt:dirty", function() { dirtyTrigger = true; });
  });

  afterEach(function() {
    targetForm.off("jdirt:reset");
    targetForm.off("jdirt:dirty");
  });

  it("should serialize the form properly after jDirt is bound", function() {
    expect(targetForm.data("jdirt-original-state")).toEqual("tested-input=initial+value");
  });

  it("should restore the form to its original state", function() {
    expect(targetForm.data("jdirt-original-state")).toEqual("tested-input=initial+value");

    targetInput.val("something that is not going to stick around");
    expect(targetInput.val()).toEqual("something that is not going to stick around");

    targetForm.jDirtRestore();
    expect(targetInput.val()).toEqual("initial value");
  });

  it("should commit the current state", function() {
    expect(targetForm.data("jdirt-original-state")).toEqual("tested-input=initial+value");

    targetInput.val("something that is here to stay");
    expect(targetInput.val()).toEqual("something that is here to stay");

    targetForm.jDirtCommitState();
    targetForm.jDirtRestore();
    expect(targetInput.val()).toEqual("something that is here to stay");
  });

  it("should commit the current state to the newest saved state after it has been saved several times", function() {
    expect(targetForm.data("jdirt-original-state")).toEqual("tested-input=initial+value");

    targetInput.val("something that is here to stay");
    expect(targetInput.val()).toEqual("something that is here to stay");

    targetInput.val("first change");
    targetForm.jDirtCommitState();
    targetForm.jDirtRestore();
    expect(targetInput.val()).toEqual("first change");

    targetInput.val("second change");
    targetForm.jDirtCommitState();
    targetForm.jDirtRestore();
    expect(targetInput.val()).toEqual("second change");

    targetInput.val("third change");
    targetForm.jDirtCommitState();
    targetForm.jDirtRestore();
    expect(targetInput.val()).toEqual("third change");
  });

  it("should trigger the reset callback when reset is called", function() {
    targetForm.jDirtRestore();
    expect(resetTrigger).toEqual(true);
  });

  it("should trigger the reset callback when the user restores the form to its original state after it has been changed", function() {
    expect(resetTrigger).toEqual(false);
    targetInput.val("1234").trigger('keyup');
    expect(resetTrigger).toEqual(false);
    targetInput.val('initial value').trigger('keyup');
    expect(resetTrigger).toEqual(true);
  });

  it("should trigger the reset callback when commit is called", function() {
    targetForm.jDirtCommitState();
    expect(resetTrigger).toEqual(true);
  });

  it("should trigger the dirty callback when the form has been altered", function() {
    targetInput.val("in with the change").trigger('keyup');
    expect(dirtyTrigger).toEqual(true);
  });

});
